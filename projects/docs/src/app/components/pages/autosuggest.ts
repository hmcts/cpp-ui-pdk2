import { Component } from '@angular/core';
import {
  AutosuggestSection,
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkFormFieldComponent,
  PdkAutosuggestComponent as AutosuggestComponent_1,
  PdkTextColorDirective
} from '@cpp/pdk';
import { HeaderComponent } from '../../common/example-header/example-header';
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
    <pdk-autosuggest
      #selection="ngModel"
      ngModel
      name="selection"
      (inputText)="handleSearchSuggestions($event)"
      [mapSuggestionToKey]="suggestionKeyExtractor"
      [mapSuggestionToLabel]="suggestionLabelExtractor"
      [suggestions]="suggestions"
      [suggestionTemplateRef]="suggestionTemplateRef"
    >
    </pdk-autosuggest>
  </pdk-form-field>
</form>

<ng-template #suggestionTemplateRef let-suggestion="suggestion">
  <b pdk-typography="body-small">{{ suggestion.country }}</b> <br />
  <span pdk-typography="body-small" pdk-text-colour="dark-grey">
    {{ suggestion.continent }}
  </span>
</ng-template>
`;

const typescript = `
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

  suggestionKeyExtractor(suggestion: ExampleAutosuggestOption) {
    return suggestion.id;
  }

  suggestionLabelExtractor(suggestion: ExampleAutosuggestOption) {
    return suggestion.country;
  }
}
`;

export interface ExampleAutosuggestOption {
  id: number;
  continent: string;
  country: string;
}

export const suggestions: ExampleAutosuggestOption[] = [
  {
    id: 0,
    continent: 'Europe',
    country: 'England'
  },
  {
    id: 1,
    continent: 'Europe',
    country: 'Poland'
  },
  {
    id: 2,
    continent: 'Europe',
    country: 'Portugal'
  },
  {
    id: 3,
    continent: 'Asia',
    country: 'China'
  },
  {
    id: 4,
    continent: 'Asia',
    country: 'Japan'
  },
  {
    id: 5,
    continent: 'Asia',
    country: 'Indonesia'
  }
];

export const sections: AutosuggestSection<ExampleAutosuggestOption>[] = suggestions.reduce(
  (list, suggestion) => {
    const section = list.find((item) => item.title === suggestion.continent);

    if (section) {
      return [
        ...list,
        {
          ...section,
          suggestions: [...section.suggestions, suggestion]
        }
      ];
    }
    return [
      ...list,
      {
        title: suggestion.continent,
        suggestions: [suggestion]
      }
    ];
  },
  [] as AutosuggestSection<ExampleAutosuggestOption>[]
);

@Component({
  selector: 'docs-autosuggest',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Autosuggest</h1>
    </docs-example-header>

    <p pdk-typography="body">
      Use this component as an alternative to a select input such that options are suggested to the
      user as they type. This component is preferred where the total number of options is large, or
      where the options themselves are unknown and must be fetched asynchronously.
    </p>
    <p pdk-typography="body">
      For conventional autosuggests using collections, then
      <a pdk-link routerLink="/components/autosuggest-lite">autosuggest lite</a> can be used.
    </p>

    <!-- Development -->

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="suggestionsHtml" [typescript]="typescript">
      <p pdk-typography="body-medium">
        Selected: {{ selection.value ? (selection.value | json) : '' }}
      </p>
      <form>
        <pdk-form-field label="Select a country" labelType="small">
          <pdk-autosuggest
            #selection="ngModel"
            ngModel
            name="selection"
            (inputText)="handleSearchSuggestions($event)"
            [mapSuggestionToKey]="suggestionKeyExtractor"
            [mapSuggestionToLabel]="suggestionLabelExtractor"
            [suggestions]="suggestions"
            [suggestionTemplateRef]="suggestionTemplateRef"
          >
          </pdk-autosuggest>
        </pdk-form-field>
      </form>

      <ng-template #suggestionTemplateRef let-suggestion="suggestion">
        <b pdk-typography="body-small">{{ suggestion.country }}</b> <br />
        <span pdk-typography="body-small" pdk-text-colour="dark-grey">{{
          suggestion.continent
        }}</span>
      </ng-template>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkAutosuggest</code> to your list of
      ngModule/standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-autosuggest</h3>
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
      <docs-props-list-item name="highlightColor" type="enum" defaultValue="dark-grey">
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
        A function which, when given a suggestion, returns a value that uniquely identifies it.
      </docs-props-list-item>
      <docs-props-list-item name="mapSuggestionToLabel" type="function">
        A function which, when given a suggestion, returns the label to display in the input when a
        suggestion is selected.
      </docs-props-list-item>
      <docs-props-list-item name="sections" type="array">
        A collection of grouped suggestions where the <code docs-code>title</code> property is the
        section title, and <code docs-code>suggestions</code> is the suggestions belonging to this
        title.
      </docs-props-list-item>
      <docs-props-list-item name="sectionTitleTemplateRef" type="TemplateRef">
        Template for rendering a section header when using <code docs-code>sections</code>.
      </docs-props-list-item>
      <docs-props-list-item name="suggestions" type="array">
        A collection of suggestions that matches the current input text. See also
        <code docs-code>sections</code>.
      </docs-props-list-item>
      <docs-props-list-item name="suggestionRef" type="TemplateRef">
        Template for rendering an individual suggestion.
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
    PdkFormFieldComponent,
    AutosuggestComponent_1,
    PdkTextColorDirective,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent,
    JsonPipe
  ]
})
export class AutosuggestComponent {
  sections: AutosuggestSection<ExampleAutosuggestOption>[] = [];
  suggestions = [] as ExampleAutosuggestOption[];

  suggestionsHtml = suggestionsHtml;
  typescript = typescript;

  handleSearchSuggestions(text: string) {
    this.suggestions = suggestions.filter(
      (value) => value.country.toLowerCase().indexOf(text.toLowerCase()) !== -1
    );
  }

  handleSearchSections(text: string) {
    this.sections = sections.reduce((all, section) => {
      const filteredSuggestions = section.suggestions.filter(
        (value) => value.country.toLowerCase().indexOf(text.toLowerCase()) !== -1
      );

      if (filteredSuggestions.length > 0) {
        return [
          ...all,
          {
            title: section.title,
            suggestions
          }
        ];
      }
      return all;
    }, [] as AutosuggestSection<ExampleAutosuggestOption>[]);
  }

  suggestionKeyExtractor(suggestion: ExampleAutosuggestOption) {
    return suggestion.id;
  }

  suggestionLabelExtractor(suggestion: ExampleAutosuggestOption) {
    return suggestion.country;
  }
}
