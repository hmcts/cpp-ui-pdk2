import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pdk-masthead',
  encapsulation: ViewEncapsulation.None,
  template: ` <div class="pdk-masthead"><ng-content></ng-content></div> `,
  styleUrls: ['./masthead.scss']
})
export class PdkMastheadComponent {}
