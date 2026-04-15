import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { PdkButtonComponent } from '@cpp/pdk';

@Component({
  selector: 'docs-navigation-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="docs-navigation-toggle"
      [class.docs-navigation-toggle--active]="toggled"
      pdk-button
      [attr.aria-expanded]="toggled"
      [attr.aria-controls]="targetId"
      [attr.aria-label]="label"
      [attr.id]="id"
      (click)="toggle.emit()"
    >
      Menu
    </button>
  `,
  styleUrls: ['./navigation-toggle.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [PdkButtonComponent]
})
export class NavigationToggleComponent {
  @Input() id: string;
  @Input() label: string;
  @Input() targetId: string;
  @Input() toggled: boolean;
  @Output() toggle = new EventEmitter<void>();
}
