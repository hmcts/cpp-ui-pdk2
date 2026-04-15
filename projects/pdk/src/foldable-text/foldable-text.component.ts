import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { generateId, stripClassesByPrefix } from '../util/index';

import { PdkLinkDirective } from '../core/links';

type FoldableLineClamp = 1 | 2 | 3 | 4;
@Component({
  selector: 'pdk-foldable-text, [pdk-foldable-text]',
  template: `
    <div
      #container
      class="pdk-foldable"
      [class.pdk-foldable--expanded]="!folded"
      [class.pdk-foldable--overflowed]="didOverflow"
    >
      <span #content class="pdk-foldable__content" [attr.id]="id"> <ng-content></ng-content> </span>
      @if (didOverflow) {
      <div class="pdk-foldable__toggle">
        {{ ' ' }}
        <a
          pdk-link
          role="button"
          unvisited
          href="javascript:void(0)"
          [attr.aria-expanded]="!folded"
          [attr.aria-controls]="id"
          [attr.aria-label]="ariaLabel"
          (click)="toggleExpanded()"
          >{{ folded ? 'More' : 'Less' }}</a
        >
      </div>
      }
    </div>
  `,
  styleUrls: ['./foldable-text.scss'],
  imports: [PdkLinkDirective]
})
export class PdkFoldableTextComponent
  implements OnChanges, AfterViewInit, AfterViewChecked, OnDestroy
{
  @Input() ariaMoreLabel: string;
  @Input() ariaLessLabel: string;
  @Input() expanded = false;
  @Input() lineClamp: FoldableLineClamp = 1;
  @Output() expandedChange = new EventEmitter<boolean>();
  @Output() overflow = new EventEmitter<boolean>();
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild('container', { static: true }) container: ElementRef;

  didOverflow = false;
  folded = true;
  id = generateId('pdk-foldable-text');
  scrollWidth: number;

  get ariaLabel(): string {
    return this.folded ? this.ariaMoreLabel : this.ariaLessLabel;
  }

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.updateFoldableClassName();
    this.checkForOverflow();
    window.addEventListener('resize', this.checkForOverflow);
  }

  ngAfterViewChecked() {
    this.updateFoldableClassName();
    this.checkForOverflow();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expanded) {
      this.updateFoldableClassName();
      this.checkForOverflow();
      this.folded = !this.expanded;
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkForOverflow);
  }

  toggleExpanded() {
    this.folded = !this.folded;
    this.expandedChange.emit(!this.folded);
  }

  private checkForOverflow = () => {
    const { width, height } = this.content.nativeElement.getBoundingClientRect();
    let didOverflow = false;

    if (this.lineClamp > 1) {
      const inlineHeight = Math.round(height);
      didOverflow = inlineHeight < this.content.nativeElement.scrollHeight;
    } else {
      const inlineWidth = Math.round(width);
      didOverflow = inlineWidth < this.content.nativeElement.scrollWidth;
    }

    if (didOverflow && !this.didOverflow) {
      this.didOverflow = true;
    }
    if (this.folded && !didOverflow && this.didOverflow) {
      this.didOverflow = false;
    }

    this.overflow.emit(this.didOverflow);
    this.cdr.detectChanges();
  };

  private updateFoldableClassName() {
    const element = this.content.nativeElement;
    stripClassesByPrefix(element.classList, 'pdk-foldable__content__');
    if (!this.folded) {
      return;
    }

    if (this.lineClamp <= 1) {
      this.renderer.addClass(element, 'pdk-foldable__content__single');
      return;
    }

    this.renderer.addClass(element, 'pdk-foldable__content__multiple');
    this.renderer.addClass(element, `pdk-foldable__content__multiple-${this.lineClamp}`);
  }
}
