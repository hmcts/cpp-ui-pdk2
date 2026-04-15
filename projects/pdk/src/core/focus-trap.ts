import { Component } from '@angular/core';
import { CdkTrapFocus } from '@angular/cdk/a11y';

@Component({
  selector: 'pdk-focus-trap, [pdk-focus-trap]',
  template: ` <div cdkTrapFocus cdkTrapFocusAutoCapture><ng-content></ng-content></div> `,
  imports: [CdkTrapFocus]
})
export class PdkFocusTrapComponent {}
