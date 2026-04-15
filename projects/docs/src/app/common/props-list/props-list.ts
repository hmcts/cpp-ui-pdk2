import { Component, Input, ViewEncapsulation } from '@angular/core';
import {
  coerceBooleanProperty,
  PdkTextColorDirective,
  PdkTypographyDirective,
  PdkMarginDirective
} from '@cpp/pdk';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[docs-code]',
  template: `
    <span pdk-text-colour="pink" pdk-typography="body-xsmall"><ng-content></ng-content></span>
  `,
  imports: [PdkTextColorDirective, PdkTypographyDirective]
})
export class CodeComponent {}

@Component({
  selector: 'docs-props-list',
  template: `
    <div role="table" class="govuk-table">
      <div role="row-group" class="govuk-table__head">
        <div role="row" pdk-typography="body-small" pdk-margin-bottom="0">
          <div
            role="columnheader"
            class="govuk-table__header docs-props-list__cell--name"
            [style.width]="propStyleWidth"
          >
            Prop
          </div>
          <div role="columnheader" class="govuk-table__header docs-props-list__cell--type">
            Type
          </div>
          @if (!hideDefaultValue) {
          <div role="columnheader" class="govuk-table__header docs-props-list__cell--default">
            Default
          </div>
          }
          <div role="columnheader" class="govuk-table__header docs-props-list__cell--description">
            Description
          </div>
        </div>
      </div>
      <div role="row-group"><ng-content></ng-content></div>
    </div>
  `,
  styleUrls: ['./props-list.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [PdkTypographyDirective, PdkMarginDirective]
})
export class PropsListComponent {
  @Input()
  set hideDefaultValue(on: any) {
    this._hideDefaultValue = coerceBooleanProperty(on);
  }
  get hideDefaultValue() {
    return this._hideDefaultValue;
  }
  @Input() propWidth: number;

  get propStyleWidth() {
    return this.propWidth ? `${this.propWidth}px` : null;
  }

  private _hideDefaultValue = false;
}

@Component({
  selector: 'docs-props-list-item',
  template: `
    <div role="row" pdk-typography="body-small" pdk-margin-bottom="0">
      <div
        [style.width]="propWidth"
        role="cell"
        class="docs-props-list__cell docs-props-list__cell--name docs-props-list__cell--unicode"
      >
        {{ name }}
      </div>
      <div
        role="cell"
        class="docs-props-list__cell docs-props-list__cell--type docs-props-list__cell--unicode"
        pdk-text-colour="pink"
      >
        {{ type }}
      </div>
      @if (!hideDefaultValue) {
      <div
        role="cell"
        class="docs-props-list__cell docs-props-list__cell--default docs-props-list__cell--unicode"
        pdk-text-colour="dark-grey"
      >
        {{ defaultValue }}
      </div>
      }
      <div role="cell" class="docs-props-list__cell docs-props-list__cell--description">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  imports: [PdkTypographyDirective, PdkMarginDirective, PdkTextColorDirective]
})
export class PropsListItemComponent {
  @Input() name: string;
  @Input() type: string;
  @Input() defaultValue: string;

  constructor(private propsListRef: PropsListComponent) {}

  get propWidth() {
    return this.propsListRef.propStyleWidth;
  }

  get hideDefaultValue() {
    return this.propsListRef.hideDefaultValue;
  }
}
