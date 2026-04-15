import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'pdk-interaction-container',
  template: ` <div #containerRef><ng-content></ng-content></div> `
})
export class PdkInteractionContainerComponent implements AfterViewInit, OnDestroy {
  @Output() focus = new EventEmitter<MouseEvent>();
  @Output() blur = new EventEmitter<MouseEvent>();
  @ViewChild('containerRef') containerRef!: ElementRef<HTMLDivElement>;

  constructor(private ngZone: NgZone) {}

  didFocus = false;

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('focusin', this.handleDocumentMouseDown);
      document.addEventListener('mousedown', this.handleDocumentMouseDown);
    });
  }

  ngOnDestroy() {
    document.removeEventListener('focusin', this.handleDocumentMouseDown);
    document.removeEventListener('mousedown', this.handleDocumentMouseDown);
  }

  handleDocumentMouseDown = (event: MouseEvent) => {
    let node: Node | null = event.target as Node;

    while (node !== null && node !== document) {
      if (node === this.containerRef.nativeElement) {
        if (!this.didFocus) {
          this.didFocus = true;
          this.ngZone.run(() => {
            this.focus.emit(event);
          });
        }
        return;
      }
      node = node.parentNode;
    }
    if (this.didFocus) {
      this.didFocus = false;
      this.ngZone.run(() => {
        this.blur.emit(event);
      });
    }
  };
}
