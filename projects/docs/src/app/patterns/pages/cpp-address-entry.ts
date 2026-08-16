import { Component, ViewEncapsulation } from '@angular/core';
import { PdkTypographyDirective } from '@cpp/pdk';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';
import { ExampleComponent } from '../../common/example/example.component';
import { FormsModule } from '@angular/forms';
import {
  Address,
  CppAddressComponent,
  CppAddressPostcodeFinderComponent,
  CppAddressAutosuggestComponent,
  addressToSingleLine
} from '@cpp/application';

const finderHtml = `
<cpp-address-postcode-finder
  [(ngModel)]="address"
  required
  (verificationStatusChange)="handleStatus($event)"
  (errors)="searchErrors = $event"
>
</cpp-address-postcode-finder>
`;

const autosuggestHtml = `
<cpp-address-autosuggest
  [(ngModel)]="address"
  required
  [inputWidth]="30"
  (verificationStatusChange)="handleStatus($event)"
>
</cpp-address-autosuggest>
`;

const manualHtml = `
<cpp-address
  [(ngModel)]="address"
  required
  (verificationStatusChange)="handleStatus($event)"
>
</cpp-address>
`;

@Component({
  selector: 'docs-page-cpp-address-entry',
  encapsulation: ViewEncapsulation.None,
  template: `
    <span pdk-typography="caption-xlarge">Common Platform</span>
    <h1 pdk-typography="heading-xlarge">Address entry</h1>

    <p pdk-typography="body">
      Address entry is a set of three form controls for capturing a UK address, each suited to a
      different journey: finding an address by postcode, searching for it as you type, or entering
      it manually.
    </p>

    <p pdk-typography="body">
      To use address entry, add the
      <code docs-code>CppAddressPostcodeFinderComponent</code>,
      <code docs-code>CppAddressAutosuggestComponent</code> or
      <code docs-code>CppAddressComponent</code> from this package to your list of ngModule/
      standalone component imports. Be sure to add
      <code docs-code>provideCPPApplicationEnvironment</code> from this package to your list of
      providers in the top parent route , bootstrap function or bootstrap module. Its second
      argument accepts providers that override the default
      <code docs-code>ADDRESS_LOOKUP_CONFIG</code>.
    </p>

    <!-- Address by postcode -->

    <h2 pdk-typography="heading-large">Address by postcode</h2>

    <p pdk-typography="body">
      <code docs-code>CppAddressPostcodeFinderComponent</code> asks for a postcode first. "Find
      address" lists the matching addresses; picking one populates the editable address fields. An
      "Enter address manually" link skips the search and opens the fields directly.
    </p>

    <docs-example [html]="finderHtml">
      <cpp-address-postcode-finder [(ngModel)]="finderAddress"></cpp-address-postcode-finder>
      @if (finderAddress; as address) {
      <p pdk-typography="body-medium">Value: {{ toSingleLine(address) }}</p>
      }
    </docs-example>

    <h3 pdk-typography="heading-medium">Api</h3>
    <docs-props-list propWidth="240">
      <docs-props-list-item name="ngModel / formControl" type="Address | null">
        The selected address. Accepts an <code docs-code>Address</code> to pre-populate the fields.
      </docs-props-list-item>
      <docs-props-list-item name="disabled" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, disables the search and the address fields.
      </docs-props-list-item>
      <docs-props-list-item name="required" type="boolean" defaultValue="false">
        When present, address line 1, town or city and postcode become mandatory.
      </docs-props-list-item>
      <docs-props-list-item name="validThreshold" type="number" defaultValue="0.9">
        The minimum Ordnance Survey match score for a Valid verification result.
      </docs-props-list-item>
      <docs-props-list-item name="needsVerificationThreshold" type="number" defaultValue="0.7">
        The minimum match score for a Needs verification result. Scores below it are Invalid.
      </docs-props-list-item>
      <docs-props-list-item name="verificationStatusChange" type="expression">
        An expression executed when an address has been verified, receiving a
        <code docs-code>VerificationStatus</code>.
      </docs-props-list-item>
      <docs-props-list-item name="errors" type="expression">
        An expression executed when the postcode search is submitted, receiving the search's
        <code docs-code>ValidationError[]</code> for use in an error summary.
      </docs-props-list-item>
    </docs-props-list>

    <!-- Address by autosuggest -->

    <h2 pdk-typography="heading-large">Address by autosuggest</h2>

    <p pdk-typography="body">
      <code docs-code>CppAddressAutosuggestComponent</code> searches as the user types. From three
      characters onwards, matching addresses are suggested; choosing one populates the editable
      address fields and clears the search box. An "Enter address manually" link opens the fields
      directly.
    </p>

    <docs-example [html]="autosuggestHtml">
      <cpp-address-autosuggest [(ngModel)]="autosuggestAddress"></cpp-address-autosuggest>
      @if (autosuggestAddress; as address) {
      <p pdk-typography="body-medium">Value: {{ toSingleLine(address) }}</p>
      }
    </docs-example>

    <h3 pdk-typography="heading-medium">Api</h3>
    <docs-props-list propWidth="240">
      <docs-props-list-item name="ngModel / formControl" type="Address | null">
        The selected address. Accepts an <code docs-code>Address</code> to pre-populate the fields.
      </docs-props-list-item>
      <docs-props-list-item name="disabled" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, disables the search and the address fields.
      </docs-props-list-item>
      <docs-props-list-item name="required" type="boolean" defaultValue="false">
        When present, address line 1, town or city and postcode become mandatory.
      </docs-props-list-item>
      <docs-props-list-item name="inputWidth" type="number">
        The width of the search input. One of 2, 3, 4, 5, 10, 20 or 30 characters. Full width when
        unset.
      </docs-props-list-item>
      <docs-props-list-item name="validThreshold" type="number" defaultValue="0.9">
        The minimum Ordnance Survey match score for a Valid verification result.
      </docs-props-list-item>
      <docs-props-list-item name="needsVerificationThreshold" type="number" defaultValue="0.7">
        The minimum match score for a Needs verification result. Scores below it are Invalid.
      </docs-props-list-item>
      <docs-props-list-item name="verificationStatusChange" type="expression">
        An expression executed when an address has been verified, receiving a
        <code docs-code>VerificationStatus</code>.
      </docs-props-list-item>
    </docs-props-list>

    <!-- Address manual entry -->

    <h2 pdk-typography="heading-large">Address manual entry</h2>

    <p pdk-typography="body">
      <code docs-code>CppAddressComponent</code> is the editable address fields on their own —
      address lines 1 to 3, town or city, county and postcode — and is what the other two flavours
      embed once an address is chosen. It also accepts a raw Ordnance Survey DPA result through its
      value accessor and converts it to an <code docs-code>Address</code>. Leaving the fields
      verifies the address and shows the status tag next to the postcode.
    </p>

    <docs-example [html]="manualHtml">
      <cpp-address [(ngModel)]="manualAddress"></cpp-address>
      @if (manualAddress; as address) {
      <p pdk-typography="body-medium">Value: {{ toSingleLine(address) }}</p>
      }
    </docs-example>

    <h3 pdk-typography="heading-medium">Api</h3>
    <docs-props-list propWidth="240">
      <docs-props-list-item name="ngModel / formControl" type="Address | OsDpaResult | null">
        The address. A DPA result written to the control is converted to an
        <code docs-code>Address</code>; the emitted value is always
        <code docs-code>Address | null</code>.
      </docs-props-list-item>
      <docs-props-list-item name="disabled" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, disables all address fields.
      </docs-props-list-item>
      <docs-props-list-item name="required" type="boolean" defaultValue="false">
        When present, address line 1, town or city and postcode become mandatory.
      </docs-props-list-item>
      <docs-props-list-item name="validThreshold" type="number" defaultValue="0.9">
        The minimum Ordnance Survey match score for a Valid verification result.
      </docs-props-list-item>
      <docs-props-list-item name="needsVerificationThreshold" type="number" defaultValue="0.7">
        The minimum match score for a Needs verification result. Scores below it are Invalid.
      </docs-props-list-item>
      <docs-props-list-item name="verificationStatusChange" type="expression">
        An expression executed when an address has been verified, receiving a
        <code docs-code>VerificationStatus</code>.
      </docs-props-list-item>
    </docs-props-list>

    <!-- Helper functions -->

    <h2 pdk-typography="heading-large">Helper functions</h2>

    <p pdk-typography="body">
      The package also exports helpers for working with the <code docs-code>Address</code> value
      once it leaves the control — the live examples above use
      <code docs-code>addressToSingleLine</code> to print the current value.
    </p>

    <docs-props-list propWidth="240">
      <docs-props-list-item name="addressToSingleLine" type="function">
        Converts an <code docs-code>Address</code> to a single comma-separated line, skipping empty
        parts. Useful for displaying a captured address in summaries and confirmation pages.
      </docs-props-list-item>
      <docs-props-list-item name="isPopulatedAddress" type="function">
        Type guard returning <code docs-code>true</code> when an address has the mandatory parts —
        line 1, town or city and postcode.
      </docs-props-list-item>
      <docs-props-list-item name="osDpaToAddress" type="function">
        Converts an Ordnance Survey DPA result (<code docs-code>OsDpaResult</code>) to an
        <code docs-code>Address</code>, composing the address lines from the organisation, building
        and street parts.
      </docs-props-list-item>
      <docs-props-list-item name="isOsDpaResult" type="function">
        Type guard distinguishing a raw <code docs-code>OsDpaResult</code> from an
        <code docs-code>Address</code>.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    PdkTypographyDirective,
    CodeComponent,
    ExampleComponent,
    FormsModule,
    PropsListComponent,
    PropsListItemComponent,
    CppAddressComponent,
    CppAddressPostcodeFinderComponent,
    CppAddressAutosuggestComponent
  ]
})
export class CppAddressEntryComponent {
  finderHtml = finderHtml;
  autosuggestHtml = autosuggestHtml;
  manualHtml = manualHtml;
  finderAddress: Address | null = null;
  autosuggestAddress: Address | null = null;
  manualAddress: Address | null = null;

  toSingleLine(address: Address): string {
    return addressToSingleLine(address);
  }
}
