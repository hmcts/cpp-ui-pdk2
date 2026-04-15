import { Component } from '@angular/core';
import { ExampleAutosuggestOption, suggestions } from './autosuggest';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkAutosuggestLiteComponent as AutosuggestLiteComponent_1
} from '@cpp/pdk';
import { RouterLink } from '@angular/router';
import { ExampleComponent } from '../../common/example/example.component';
import { FormsModule } from '@angular/forms';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';
import { JsonPipe } from '@angular/common';

const suggestionsHtml = `
<form>
  <pdk-form-field label="Select a country" labelType="small">
    <pdk-autosuggest-lite
      ngModel
      name="selection"
      (inputText)="handleSearchSuggestions($event)"
      [suggestions]="suggestions"
      suggestionKey="id"
      suggestionTitle="country"
      suggestionSubtitle="continent"
    >
    </pdk-autosuggest-lite>
  </pdk-form-field>
</form>
`;

const suggestionsTypescript = `
interface ExampleAutosuggestOption {
  id: number;
  continent: string;
  country: string;
}

class ExampleComponent {
  suggestions: ExampleAutosuggestOption[] = [...];

  handleSearchSuggestions(text: string) {
    this.suggestions = suggestions.filter(
      value => value.country.toLowerCase().indexOf(text.toLowerCase()) !== -1
    );
  }
}
`;

@Component({
  selector: 'docs-autosuggest-lite',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Autosuggest (lite)</h1>
    </docs-example-header>

    <p pdk-typography="body">
      Use this component as an alternative to a select input such that options are suggested to the
      user as they type. This component is preferred where the total number of options is large, or
      where the options themselves are unknown and must be fetched asynchronously.
    </p>
    <p pdk-typography="body">
      For more advanced implementations, then
      <a pdk-link routerLink="/components/autosuggest">autosuggest</a> can be used.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="suggestionsHtml" [typescript]="suggestionsTypescript">
      <p pdk-typography="body-medium">
        Selected: {{ selection.value ? (selection.value | json) : '' }}
      </p>
      <form>
        <pdk-autosuggest-lite
          #selection="ngModel"
          ngModel
          name="selection"
          (inputText)="handleSearchSuggestions($event)"
          [suggestions]="suggestions"
          suggestionKey="id"
          suggestionTitle="country"
          suggestionSubtitle="continent"
        >
        </pdk-autosuggest-lite>
      </form>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      This component functions as a <code docs-code>ControlValueAccessor</code> and a
      <code docs-code>FormFieldControl</code>. To use this component, add
      <code docs-code>PdkAutosuggest</code> or <code docs-code>PdkAutosuggestLiteComponent</code> to
      your list of ngModule/standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-autosuggest-lite</h3>
    <p pdk-typography="body"></p>
    <docs-props-list propWidth="200">
      <docs-props-list-item name="ariaDescribedBy" type="string">
        An id for an element providing a full description of the autosuggest input.
      </docs-props-list-item>
      <docs-props-list-item name="ariaLabel" type="string">
        An accessible label describing the intent of the autosuggest.
      </docs-props-list-item>
      <docs-props-list-item name="ariaLabelledBy" type="string">
        An id for an element providing a label for the autosuggest input.
      </docs-props-list-item>
      <docs-props-list-item name="disabled" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, prevents interaction with the autosuggest input.
      </docs-props-list-item>
      <docs-props-list-item name="highlightColor" type="enum" defaultValue="mid-grey">
        The <a pdk-link routerLink="/components/colour">color</a> with which to highlight a
        suggestion.
      </docs-props-list-item>
      <docs-props-list-item name="highlightFirstSuggestion" type="boolean" defaultValue="true">
        When <code docs-code>true</code> the first option will be highlighted when the suggestions
        container is made visible.
      </docs-props-list-item>
      <docs-props-list-item name="id" type="string"> The unique element id. </docs-props-list-item>
      <docs-props-list-item name="inputText" type="expression">
        An expression executed when the input text changes.
      </docs-props-list-item>
      <docs-props-list-item name="inputWidth" type="number">
        The width in responsive units to attribute to the input.
      </docs-props-list-item>
      <docs-props-list-item name="mapSuggestionToKey" type="function">
        A function which, when given a suggestion, returns a value that uniquely identifies it. See
        also <code docs-code>suggestionKey</code>.
      </docs-props-list-item>
      <docs-props-list-item name="mapSuggestionToTitle" type="function">
        A function which, when given a suggestion, returns the title to display for a suggestion.
        See also <code docs-code>suggestionTitle</code>.
      </docs-props-list-item>
      <docs-props-list-item name="mapSuggestionToSubtitle" type="function">
        A function which, when given a suggestion, returns a subtitle to display for a suggestion.
        See also <code docs-code>suggestionSubtitle</code>.
      </docs-props-list-item>
      <docs-props-list-item name="suggestions" type="array" defaultValue="[]">
        A collection of suggestions that matches the current input text.
      </docs-props-list-item>
      <docs-props-list-item name="suggestionKey" type="string | number">
        The property of a suggestion that uniquely identifies it. Must be be provided unless a
        <code docs-code>mapSuggestionToKey</code> is used instead.
      </docs-props-list-item>
      <docs-props-list-item name="suggestionTitle" type="string">
        The property of a suggestion used to display as the title the suggested option. Must be be
        provided unless a <code docs-code>mapSuggestionToTitle</code> is used instead.
      </docs-props-list-item>
      <docs-props-list-item name="suggestionSubtitle" type="string">
        Optionally, the property of a suggestion used to display as the subtitle the suggested
        option. See also <code docs-code>mapSuggestionToSubtitle</code>.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    RouterLink,
    ExampleComponent,
    FormsModule,
    AutosuggestLiteComponent_1,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent,
    JsonPipe
  ]
})
export class AutosuggestLiteComponent {
  suggestions = [] as ExampleAutosuggestOption[];
  suggestionsHtml = suggestionsHtml;
  suggestionsTypescript = suggestionsTypescript;

  handleSearchSuggestions(text: string) {
    if (text.length !== 0) {
      this.suggestions = suggestions.filter(
        (value) => value.country.toLowerCase().indexOf(text.toLowerCase()) !== -1
      );
    } else {
      this.suggestions = [];
    }
  }
}
