import {
  AfterViewChecked,
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  Self
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { generateId } from '../util/index';

@Directive({ selector: 'textarea[pdk-resize]' })
export class PdkResizeDirective implements AfterViewChecked, AfterViewInit, OnDestroy {
  @HostBinding('class.govuk-input') input = true;
  @Input() minRows: number;
  @Input() maxRows: number;

  private id = generateId('pdk-resize');
  private onNextFrameActionId: number;

  @HostListener('wheel', ['$event'])
  onWheel(e: WheelEvent) {
    if (!e || this.elementRef.nativeElement.style.overflowY === 'hidden') {
      return;
    }
    const deltaY = e['deltaY'];
    const { offsetHeight, scrollTop, scrollHeight } = this.elementRef.nativeElement;
    const up = deltaY < 0;

    if (!up && scrollHeight < deltaY + offsetHeight + scrollTop) {
      // Scrolling down, but this will take us past the bottom.
      this.elementRef.nativeElement.scrollTop = scrollHeight;
      prevent();
    } else if (up && -deltaY > scrollTop) {
      this.elementRef.nativeElement.scrollTop = 0;
      prevent();
    }

    function prevent() {
      e.stopPropagation();
      e.preventDefault();
      e.returnValue = false;
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.resize();
  }

  constructor(@Self() private ngControl: NgControl, private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.ngControl.valueChanges.pipe(startWith(null)).subscribe(() => {
      this.clearNextFrame();
      this.onNextFrame(this.resize);
    });
  }

  ngOnDestroy() {
    this.clearNextFrame();
  }

  ngAfterViewChecked() {
    this.resize();
  }

  private resize = () => {
    const { height, minHeight, maxHeight } = calculateNodeHeight(
      this.elementRef.nativeElement,
      this.id,
      this.minRows || 4,
      this.maxRows || 16
    );
    this.elementRef.nativeElement.style.resize = 'none';
    this.elementRef.nativeElement.style.height = `${height}px`;
    this.elementRef.nativeElement.style.minHeight = `${minHeight}px`;
    this.elementRef.nativeElement.style.maxHeight = `${maxHeight}px`;
  };

  private onNextFrame(cb) {
    if (window.requestAnimationFrame) {
      this.onNextFrameActionId = window.requestAnimationFrame(cb);
    } else {
      cb();
    }
  }

  private clearNextFrame() {
    if (this.onNextFrameActionId) {
      cancelAnimationFrame(this.onNextFrameActionId);
    }
  }
}

const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`;

const SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
];

const computedStyleCache = {};
let hiddenTextarea: HTMLTextAreaElement;

function calculateNodeHeight( // NOSONAR
  uiTextNode: HTMLTextAreaElement,
  id: string,
  minRows: number,
  maxRows: number
): {
  height: number;
  minHeight: number;
  maxHeight: number;
} {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea');
    document.body.appendChild(hiddenTextarea);
  }

  // evaluate the width of the original node in case it has been changed externally
  // such as through css style rule inheritance
  const HIDDEN_WIDTH_STYLE = `width: ${uiTextNode.clientWidth}px;`;

  // Copy all CSS properties that have an impact on the height of the content in
  // the textbox
  const { borderSize, boxSizing, paddingSize, sizingStyle } = calculateNodeStyling(uiTextNode, id);
  // Need to have the overflow attribute to hide the scrollbar otherwise
  // text-lines will not calculated properly as the shadow will technically be
  // narrower for content
  hiddenTextarea.setAttribute(
    'style',
    [sizingStyle, HIDDEN_TEXTAREA_STYLE, HIDDEN_WIDTH_STYLE].join(';')
  );
  hiddenTextarea.value = uiTextNode.value || uiTextNode.placeholder || 'x';

  let minHeight = -Infinity;
  let maxHeight = Infinity;
  let height = hiddenTextarea.scrollHeight;

  if (boxSizing === 'border-box') {
    // border-box: add border, since height = content + padding + border
    height = height + borderSize;
  } else if (boxSizing === 'content-box') {
    // remove padding, since height = content
    height = height - paddingSize;
  }

  if (minRows !== null || maxRows !== null) {
    // measure height of a textarea with a single row
    hiddenTextarea.value = 'X';
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

    if (minRows !== null) {
      minHeight = singleRowHeight * minRows;
      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize;
      }
      height = Math.max(minHeight, height);
    }
    if (maxRows !== null) {
      maxHeight = singleRowHeight * maxRows;
      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize;
      }
      height = Math.min(maxHeight, height);
    }
  }
  return { height, minHeight, maxHeight };
}

function calculateNodeStyling(
  node,
  id
): {
  borderSize: number;
  boxSizing: string;
  paddingSize: number;
  sizingStyle: string;
} {
  if (computedStyleCache[id]) {
    return computedStyleCache[id];
  }
  const style = window.getComputedStyle(node);

  const boxSizing =
    style.getPropertyValue('box-sizing') ||
    style.getPropertyValue('-moz-box-sizing') ||
    style.getPropertyValue('-webkit-box-sizing');

  const paddingSize =
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'));

  const borderSize =
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'));

  const sizingStyle = SIZING_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(
    ';'
  );

  const nodeInfo = {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing
  };

  if (!isNaN(paddingSize) && !isNaN(borderSize)) {
    computedStyleCache[id] = nodeInfo;
  }
  return nodeInfo;
}
