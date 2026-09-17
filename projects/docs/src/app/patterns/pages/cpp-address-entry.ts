import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  PdkButton,
  PdkErrorSummaryComponent,
  PdkForm,
  PdkInsetTextComponent,
  PdkTypographyDirective,
  ValidationError,
  PdkMarginDirective
} from '@cpp/pdk';
import {
  Address,
  AddressFieldsConfig,
  addressToSingleLine,
  CppAddressAutosuggestComponent,
  CppAddressComponent,
  CppAddressPostcodeFinderComponent
} from '@cpp/application';

import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';
import { ExampleComponent } from '../../common/example/example.component';

const finderHtml = `
<form pdk-form (errors)="formErrors = $event" (validSubmit)="save()">


  <pdk-form-field label="Address">
    <cpp-address-postcode-finder
    (addressFound)="address = $event"
    (errors)="searchErrors = $event"
  >
  </cpp-address-postcode-finder>
    <cpp-address name="address" required [(ngModel)]="address"></cpp-address>
  </pdk-form-field>

  <button pdk-button type="submit">Save address</button>
</form>
`;

const autosuggestHtml = `
<form pdk-form (errors)="formErrors = $event" (validSubmit)="save()">
  <pdk-form-field label="Search for an address">
    <cpp-address-autosuggest
      name="address"
      required
      [inputWidth]="30"
      [(ngModel)]="address"
    >
    </cpp-address-autosuggest>
  </pdk-form-field>

  <button pdk-button type="submit">Save address</button>
</form>
`;

const pairedHtml = `
<form pdk-form (errors)="formErrors = $event" (validSubmit)="save()">
  <pdk-form-field label="Search for an address">
    <cpp-address-autosuggest
      ngModel
      [ngModelOptions]="{ standalone: true }"
      clearOnSelection
      [inputWidth]="30"
      (ngModelChange)="address = $event"
    >
    </cpp-address-autosuggest>
  </pdk-form-field>

  <pdk-form-field label="Address">
    <cpp-address name="address" required [(ngModel)]="address"></cpp-address>
  </pdk-form-field>

  <button pdk-button type="submit">Save address</button>
</form>
`;

const manualHtml = `
<form pdk-form (errors)="formErrors = $event" (validSubmit)="save()">
  <pdk-form-field label="Address" labelType="small">
    <cpp-address
      name="address"
      required
      [fields]="{
        line1: { labelType: 'default' },
        line2: { labelType: 'default' },
        line3: { labelType: 'default' },
        line4: { labelType: 'default' },
        line5: { labelType: 'default' },
        postcode: { labelType: 'default' }
      }"
      [(ngModel)]="address"
    >
    </cpp-address>
  </pdk-form-field>

  <button pdk-button type="submit">Save address</button>
</form>
`;

const fieldsHtml = `
<form pdk-form (errors)="formErrors = $event" (validSubmit)="save()">
  <pdk-form-field label="Address" labelType="small">
    <cpp-address
      name="address"
      required
      [fields]="{
        line1: { errorMessages: { required: 'Enter the building and street' } },
        line4: { label: 'Ward' },
        line5: { label: 'Region (optional)', maxChars: 60 }
      }"
      [(ngModel)]="address"
    >
    </cpp-address>
  </pdk-form-field>

  <button pdk-button type="submit">Save address</button>
</form>
`;

@Component({
  selector: 'docs-page-cpp-address-entry',
  encapsulation: ViewEncapsulation.None,
  template: `
    <span pdk-typography="caption-xlarge">Common Platform</span>
    <h1 pdk-typography="heading-xlarge">Addresses</h1>

    <p pdk-typography="body">
      Three components for capturing a UK address. One is the address fields. The other two find an
      address, by postcode or as the user types. Use whichever your journey needs.
    </p>

    <p pdk-typography="body">
      They all call the address lookup service through <code docs-code>CppHttp</code>, so there is
      nothing to configure here. As long as your app sets its base url the way it already does for
      every other service, the calls reach the right place.
    </p>

    <p pdk-typography="body">
      When the lookup is unavailable the searches say so and invite the user to type the address in
      instead, and an address that could not be checked is tagged Unverified rather than being
      wrongly marked Invalid.
    </p>

    <pdk-inset-text>
      The examples on this page run on stubbed data, so none of them call the real lookup service.
      Search <code docs-code>CV1 2AA</code> for a long list of Coventry addresses, or
      <code docs-code>CV32 5BB</code> for a short one in Leamington Spa. Search as you type matches
      on any part of an address, so try <code docs-code>Aylward</code> or
      <code docs-code>Rosewood</code>.
    </pdk-inset-text>

    <!-- Find by postcode -->

    <h2 pdk-typography="heading-large">Find by postcode</h2>

    <p pdk-typography="body">
      Import <code docs-code>CppAddressPostcodeFinderComponent</code>. The user enters a postcode
      and picks from the addresses at it, and the one they pick comes back through
      <code docs-code>addressFound</code>.
    </p>

    <p pdk-typography="body">
      It holds no value and is not a form control, so it can sit inside the same
      <code docs-code>pdk-form-field</code> as the <code docs-code>cpp-address</code> it feeds, and
      the address fields remain the thing the form is bound to. Its search runs on its own small
      form, so Find address never submits the page, and anything wrong with the postcode comes back
      through <code docs-code>errors</code> for your <code docs-code>pdk-error-summary</code>.
    </p>

    <docs-example [html]="finderHtml">
      <form pdk-form (errors)="setFormErrors($event)" (validSubmit)="save('postcode')">
        @if (finderErrors; as errors) {
        <pdk-error-summary [errors]="errors"></pdk-error-summary>
        }

        <pdk-form-field label="Address">
          <cpp-address-postcode-finder
            pdk-margin-bottom="2"
            (addressFound)="finderAddress = $event"
            (errors)="setSearchErrors($event)"
          ></cpp-address-postcode-finder>
          <cpp-address
            name="finderAddress"
            required
            [ngModel]="finderAddress"
            (ngModelChange)="finderAddress = $event"
          ></cpp-address>
        </pdk-form-field>

        <button pdk-button type="submit">Save address</button>
      </form>
    </docs-example>

    <h3 pdk-typography="heading-medium">Api</h3>
    <docs-props-list propWidth="200">
      <docs-props-list-item name="disabled" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, turns off the postcode box, the button and the list of
        results.
      </docs-props-list-item>
      <docs-props-list-item name="addressFound" type="expression">
        An expression executed when the user picks an address from the results. It receives an
        <code docs-code>Address</code>.
      </docs-props-list-item>
      <docs-props-list-item name="errors" type="expression">
        An expression executed when the postcode search is submitted. It receives the search's
        <code docs-code>ValidationError[]</code>, which you can pass to an error summary.
      </docs-props-list-item>
    </docs-props-list>

    <!-- Search as you type -->

    <h2 pdk-typography="heading-large">Search as you type</h2>

    <p pdk-typography="body">
      Import <code docs-code>CppAddressAutosuggestComponent</code>. Addresses are suggested once the
      user has typed three characters, and picking one sets the value. This one is a form control,
      so bind it with <code docs-code>ngModel</code> or <code docs-code>formControl</code> and wrap
      it in a <code docs-code>pdk-form-field</code>. The label, the hint and any error message are
      yours to set.
    </p>

    <p pdk-typography="body">
      By default the chosen address stays in the box, so the user can see what they picked. If you
      are using it to feed something else, such as a
      <code docs-code>cpp-address</code> or a list, set <code docs-code>clearOnSelection</code> and
      the box empties ready for the next search.
    </p>

    <docs-example [html]="autosuggestHtml">
      <form pdk-form (errors)="suggestErrors = $event" (validSubmit)="save('autosuggest')">
        @if (suggestErrors; as errors) {
        <pdk-error-summary [errors]="errors"></pdk-error-summary>
        }

        <pdk-form-field label="Search for an address">
          <cpp-address-autosuggest
            name="suggestAddress"
            required
            [inputWidth]="30"
            [ngModel]="suggestAddress"
            (ngModelChange)="suggestAddress = $event"
          ></cpp-address-autosuggest>
        </pdk-form-field>

        @if (suggestAddress; as address) {
        <p pdk-typography="body-medium">You picked {{ toSingleLine(address) }}</p>
        }

        <button pdk-button type="submit">Save address</button>
      </form>
    </docs-example>

    <h3 pdk-typography="heading-medium">Passing the address to the fields</h3>

    <p pdk-typography="body">
      Most of the time you want the user to see what they picked and be able to correct it. Put a
      <code docs-code>cpp-address</code> underneath and let the search hand the address down to it.
    </p>

    <p pdk-typography="body">
      The search box is only a way in, so keep it out of the form by marking it standalone. The form
      then has one value, the address, held by the fields. Add
      <code docs-code>clearOnSelection</code> so the box empties once the address has moved down,
      which also makes it obvious the fields are now the thing to edit.
    </p>

    <docs-example [html]="pairedHtml">
      <form pdk-form (errors)="pairedErrors = $event" (validSubmit)="save('paired')">
        @if (pairedErrors; as errors) {
        <pdk-error-summary [errors]="errors"></pdk-error-summary>
        }

        <pdk-form-field label="Search for an address">
          <cpp-address-autosuggest
            ngModel
            [ngModelOptions]="{ standalone: true }"
            clearOnSelection
            [inputWidth]="30"
            (ngModelChange)="pairedAddress = $event"
          ></cpp-address-autosuggest>
        </pdk-form-field>

        <pdk-form-field label="Address">
          <cpp-address
            name="pairedAddress"
            required
            [ngModel]="pairedAddress"
            (ngModelChange)="pairedAddress = $event"
          ></cpp-address>
        </pdk-form-field>

        <button pdk-button type="submit">Save address</button>
      </form>
    </docs-example>

    <h3 pdk-typography="heading-medium">Api</h3>
    <docs-props-list propWidth="200">
      <docs-props-list-item name="ngModel / formControl" type="Address | null">
        The chosen address.
      </docs-props-list-item>
      <docs-props-list-item name="ariaLabel" type="string">
        A label for the search box, for when there is no visible one.
      </docs-props-list-item>
      <docs-props-list-item name="ariaLabelledBy" type="string">
        The id of the element that labels the search box.
      </docs-props-list-item>
      <docs-props-list-item name="clearOnSelection" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, empties the search box after the user picks an address.
      </docs-props-list-item>
      <docs-props-list-item name="disabled" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, turns off the search box.
      </docs-props-list-item>
      <docs-props-list-item name="inputWidth" type="number">
        How wide the search box is, in characters. One of 2, 3, 4, 5, 10, 20 or 30. Full width if
        you leave it out.
      </docs-props-list-item>
    </docs-props-list>

    <!-- Enter an address -->

    <h2 pdk-typography="heading-large">Enter an address</h2>

    <p pdk-typography="body">
      Import <code docs-code>CppAddressComponent</code>. Five address lines and a postcode, where
      line 4 is the town or city and line 5 is the county. It is a form control, so bind it and wrap
      it in a <code docs-code>pdk-form-field</code>. Give the field a label such as Address, because
      the component labels each line but not the group.
    </p>

    <p pdk-typography="body">
      Add <code docs-code>required</code> and the user must fill in the first line and the postcode.
      The other lines stay optional.
    </p>

    <p pdk-typography="body">
      Once an address is complete it is checked against Ordnance Survey, and a tag next to the
      postcode says whether it is valid, needs checking, or was not recognised. The check never
      blocks the form, it only reports, and the result also comes back through
      <code docs-code>verificationStatusChange</code>.
    </p>

    <p pdk-typography="body">
      Errors appear on the field that caused them, next to address line 1 or the postcode or
      wherever the problem is, and each one gets its own entry in the error summary. You will not
      see a second, vaguer message on the group, because the component tells the form field it is
      showing those errors itself. The form still knows it is invalid, so
      <code docs-code>form.valid</code> and anything you have hanging off it behave as you would
      expect.
    </p>

    <docs-example [html]="manualHtml">
      <form pdk-form (errors)="manualErrors = $event" (validSubmit)="save('manual')">
        @if (manualErrors; as errors) {
        <pdk-error-summary [errors]="errors"></pdk-error-summary>
        }

        <pdk-form-field label="Address" labelType="small">
          <cpp-address
            name="manualAddress"
            required
            [fields]="manualFields"
            [ngModel]="manualAddress"
            (ngModelChange)="manualAddress = $event"
          ></cpp-address>
        </pdk-form-field>

        <button pdk-button type="submit">Save address</button>
      </form>
    </docs-example>

    <h3 pdk-typography="heading-medium">Api</h3>
    <docs-props-list propWidth="200">
      <docs-props-list-item name="ngModel / formControl" type="Address | null">
        The address.
      </docs-props-list-item>
      <docs-props-list-item name="disabled" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, turns off every field.
      </docs-props-list-item>
      <docs-props-list-item name="fields" type="object">
        Changes the label , label type, error message or the character limit of any field. See
        below.
      </docs-props-list-item>
      <docs-props-list-item name="required" type="boolean" defaultValue="false">
        When present, the user must fill in address line 1 and the postcode.
      </docs-props-list-item>
      <docs-props-list-item name="validThreshold" type="number" defaultValue="0.9">
        The Ordnance Survey score at which an address is treated as valid.
      </docs-props-list-item>
      <docs-props-list-item name="needsVerificationThreshold" type="number" defaultValue="0.7">
        The score at which an address is treated as needing a check. Anything lower is treated as
        not recognised.
      </docs-props-list-item>
      <docs-props-list-item name="verificationStatusChange" type="expression">
        An expression executed once an address has been checked. It receives a
        <code docs-code>VerificationStatus</code>.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">Labels, limits and messages</h3>

    <p pdk-typography="body">
      Every field starts with a label, a label type, a character limit and a message for each thing
      that can go wrong with it. Pass a <code docs-code>fields</code> object to change any of them,
      on as many or as few fields as you like. Anything you leave out keeps its default, so changing
      a label does not lose the limit or the messages that came with it.
    </p>

    <docs-example [html]="fieldsHtml">
      <form pdk-form (errors)="fieldsErrors = $event" (validSubmit)="save('fields')">
        @if (fieldsErrors; as errors) {
        <pdk-error-summary [errors]="errors"></pdk-error-summary>
        }

        <pdk-form-field label="Address" labelType="small">
          <cpp-address
            name="fieldsAddress"
            required
            [fields]="configFields"
            [ngModel]="fieldsAddress"
            (ngModelChange)="fieldsAddress = $event"
          ></cpp-address>
        </pdk-form-field>

        <button pdk-button type="submit">Save address</button>
      </form>
    </docs-example>

    <p pdk-typography="body">Each entry takes any of these.</p>

    <docs-props-list propWidth="200">
      <docs-props-list-item name="label" type="string"> The field's label. </docs-props-list-item>
      <docs-props-list-item name="labelType" type="string" defaultValue="small">
        How big the label is. One of <code docs-code>default</code>, <code docs-code>small</code>,
        <code docs-code>medium</code>, <code docs-code>large</code>,
        <code docs-code>xlarge</code> or <code docs-code>none</code>.
      </docs-props-list-item>
      <docs-props-list-item name="maxChars" type="number" defaultValue="35">
        The character limit. Not available on the postcode.
      </docs-props-list-item>
      <docs-props-list-item name="errorMessages" type="object">
        A message per rule. An address line field takes <code docs-code>required</code>,
        <code docs-code>addressLine</code> and <code docs-code>maximumLength</code>. The postcode
        takes <code docs-code>required</code> and <code docs-code>postcode</code>.
      </docs-props-list-item>
    </docs-props-list>

    <p pdk-typography="body">And these are the fields you can pass them for.</p>

    <docs-props-list propWidth="200">
      <docs-props-list-item name="line1" type="object" defaultValue="Address line 1">
        The first line. Required when <code docs-code>required</code> is set.
      </docs-props-list-item>
      <docs-props-list-item name="line2" type="object" defaultValue="Address line 2 (optional)">
        Optional.
      </docs-props-list-item>
      <docs-props-list-item name="line3" type="object" defaultValue="Address line 3 (optional)">
        Optional.
      </docs-props-list-item>
      <docs-props-list-item name="line4" type="object" defaultValue="Town or city">
        The town or city. This is where a postcode search puts the post town.
      </docs-props-list-item>
      <docs-props-list-item name="line5" type="object" defaultValue="County (optional)">
        The county. Left out when the address is checked, because Ordnance Survey does not hold one
        and sending it lowers the score.
      </docs-props-list-item>
      <docs-props-list-item name="postcode" type="object" defaultValue="Postcode">
        Takes a label, a label type and its two messages. No character limit.
      </docs-props-list-item>
    </docs-props-list>

    <!-- Helpers -->

    <h2 pdk-typography="heading-large">Helpers</h2>

    <p pdk-typography="body">
      A few functions come with the components for working with an address once you have one.
    </p>

    <docs-props-list propWidth="200">
      <docs-props-list-item name="addressToSingleLine" type="function">
        Turns an address into one line, separated by commas, skipping anything empty. Handy for
        summary pages and confirmation screens.
      </docs-props-list-item>
      <docs-props-list-item name="isPopulatedAddress" type="function">
        Tells you whether an address has the parts that matter, which are the first line and the
        postcode.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    PdkTypographyDirective,
    PdkErrorSummaryComponent,
    PdkForm,
    PdkButton,
    FormsModule,
    CodeComponent,
    ExampleComponent,
    PropsListComponent,
    PropsListItemComponent,
    CppAddressComponent,
    CppAddressPostcodeFinderComponent,
    CppAddressAutosuggestComponent,
    PdkMarginDirective,
    PdkInsetTextComponent
  ]
})
export class CppAddressEntryComponent {
  finderHtml = finderHtml;
  autosuggestHtml = autosuggestHtml;
  pairedHtml = pairedHtml;
  manualHtml = manualHtml;
  fieldsHtml = fieldsHtml;

  manualFields: AddressFieldsConfig = {
    line1: { labelType: 'default' },
    line2: { labelType: 'default' },
    line3: { labelType: 'default' },
    line4: { labelType: 'default' },
    line5: { labelType: 'default' },
    postcode: { labelType: 'default' }
  };

  configFields: AddressFieldsConfig = {
    line1: { errorMessages: { required: 'Enter the building and street' } },
    line4: { label: 'Ward' },
    line5: { label: 'Region (optional)', maxChars: 60 }
  };

  finderAddress: Address | null = null;
  fieldsAddress: Address | null = null;
  suggestAddress: Address | null = null;
  pairedAddress: Address | null = null;
  manualAddress: Address | null = null;

  finderErrors: ValidationError[] | null = null;
  suggestErrors: ValidationError[] | null = null;
  pairedErrors: ValidationError[] | null = null;
  manualErrors: ValidationError[] | null = null;
  fieldsErrors: ValidationError[] | null = null;

  private searchErrors: ValidationError[] | null = null;
  private formErrors: ValidationError[] | null = null;

  setSearchErrors(errors: ValidationError[] | null) {
    this.searchErrors = errors;
    this.combineFinderErrors();
  }

  setFormErrors(errors: ValidationError[] | null) {
    this.formErrors = errors;
    this.combineFinderErrors();
  }

  toSingleLine(address: Address): string {
    return addressToSingleLine(address);
  }

  private combineFinderErrors() {
    const combined = [...(this.searchErrors ?? []), ...(this.formErrors ?? [])];
    this.finderErrors = combined.length ? combined : null;
  }

  save(flavour: string) {
    console.log(`Saved (${flavour})`);
  }
}
