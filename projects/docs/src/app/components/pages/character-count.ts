import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkInputComponent,
  PdkInputDirective,
  PdkCharacterCountComponent as CharacterCountComponent_1
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import { FormsModule } from '@angular/forms';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<input #model="ngModel" ngModel pdk-input />
<pdk-character-count [value]="model.value" limit="10"> </pdk-character-count>
`;

@Component({
  selector: 'docs-character-count',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Character count</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Help users know how much text they can enter when there is a limit on the number of
      characters. The usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/character-count/">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <input #model="ngModel" ngModel pdk-input />
      <pdk-character-count [value]="model.value" limit="10"> </pdk-character-count>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkCharacterCountComponent</code> to your list of
      ngModule/standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-character-count</h3>
    <docs-props-list>
      <docs-props-list-item name="value" type="string">
        The value whose characters will be counted.
      </docs-props-list-item>
      <docs-props-list-item name="limit" type="number">
        The maximum number of characters permitted.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    FormsModule,
    PdkInputComponent,
    PdkInputDirective,
    CharacterCountComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class CharacterCountComponent {
  html = markup;
}
