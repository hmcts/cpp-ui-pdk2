import { Component, ViewEncapsulation } from '@angular/core';
import { CookiesService } from '@cpp/core';
import { PdkTypographyDirective, PdkMarginDirective, PdkCheckboxComponent } from '@cpp/pdk';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';
import { ExampleComponent } from '../../common/example/example.component';
import { FormsModule } from '@angular/forms';
import { CppApplicationLayoutComponent } from '@cpp/application';
import { SystemAnnouncementsService } from '@cpp/users-groups';

const html = `
<cpp-application-layout
  [apiError]="apiError"
  [headerNavItems]="[
    { href: 'javascript:void(0)', title: 'Menu Item 1' }
  ]"
  [offline]="offline"
  phaseType="Beta"
  [searchEnabled]="searchbar"
  searchLabel="Search for cases by name or code"
  serviceName="Common Platform"
>
</cpp-application-layout>
`;

@Component({
  selector: 'docs-page-cpp-layout',
  encapsulation: ViewEncapsulation.None,
  template: `
    <span pdk-typography="caption-xlarge">Common Platform</span>
    <h1 pdk-typography="heading-xlarge">Application layout</h1>

    <p pdk-typography="body">
      To use the application layout, add the
      <code docs-code>CppApplicationLayoutComponent</code> from this package to your list of
      ngModule/ standalone component imports. Be sure to add
      <code docs-code>provideCPPApplicationEnvironment</code> from this package to your list of
      providers in the top parent route , bootstrap function or bootstrap module.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <cpp-application-layout
        [apiError]="apiError"
        cookiesLink="#"
        [headerNavItems]="[{ href: 'javascript:void(0)', title: 'Menu Item 1' }]"
        [offline]="offline"
        phaseType="beta"
        [searchEnabled]="searchbar"
        searchLabel="Search for cases by name or code"
        serviceName="Common Platform"
        termsLink="#"
        (search)="handleSearch($event)"
      >
      </cpp-application-layout>
      <div pdk-margin-top="6">
        <h3>Customize</h3>
        <pdk-checkbox [(ngModel)]="apiError">Api error</pdk-checkbox>
        <pdk-checkbox [(ngModel)]="cookieMessage">Cookie message</pdk-checkbox>
        <pdk-checkbox [(ngModel)]="offline">Offline</pdk-checkbox>
        <pdk-checkbox [(ngModel)]="searchbar">Search bar</pdk-checkbox>
      </div>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <docs-props-list propWidth="140">
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
      <docs-props-list-item name="accessibilityLink" type="string">
        The url of any accessibility link in the footer.
      </docs-props-list-item>
      <docs-props-list-item name="activity" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, displays an activity spinner over the component.
      </docs-props-list-item>
      <docs-props-list-item name="apiError" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, displays an alert about a failed api request.
      </docs-props-list-item>
      <docs-props-list-item name="cookiesLink" type="string" defaultValue="/cookies">
        The url of the cookies preferences link.
      </docs-props-list-item>
      <docs-props-list-item name="headerNavItems" type="array">
        A collection of nav items, where <code docs-code>href</code> is the target, and
        <code docs-code>title</code> is the label.
      </docs-props-list-item>
      <docs-props-list-item name="offline" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, displays an alert about being offline.
      </docs-props-list-item>
      <docs-props-list-item name="phaseType" type="string" defaultValue="Beta">
        The phase of delivery of the service.
      </docs-props-list-item>
      <docs-props-list-item name="serviceLink" type="string" defaultValue="#">
        The url belonging to the service name link.
      </docs-props-list-item>
      <docs-props-list-item name="serviceName" type="string">
        The service the application is providing.
      </docs-props-list-item>
      <docs-props-list-item name="searchEnabled" type="string">
        When <code docs-code>true</code>, displays a global searchbar.
      </docs-props-list-item>
      <docs-props-list-item name="searchLabel" type="string">
        Essential information of the intent of the search. Used for accessibility.
      </docs-props-list-item>
      <docs-props-list-item name="searchPlaceholder" type="string">
        Placeholder text for the search input.
      </docs-props-list-item>
      <docs-props-list-item name="search" type="expression">
        An expression executed when the user submits the text entered into the searchbar.
      </docs-props-list-item>
      <docs-props-list-item name="supportEmails" type="array">
        A collection of support emails, where <code docs-code>href</code> is the target,
        <code docs-code>title</code> is the label and <code docs-code>email</code> is the email
        address.
      </docs-props-list-item>
      <docs-props-list-item name="termsLink" type="string" defaultValue="/terms-and-conditions">
        The url of any terms and conditions link in the footer.
      </docs-props-list-item>
      <docs-props-list-item name="feedback" type="expression">
        An expression executed when the feedback link is clicked.
      </docs-props-list-item>
      <docs-props-list-item name="wide" type="boolean" defaultValue="false">
        When <code docs-code>true</code>, sets the container width to 1410px. Default is 1170px
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    PdkTypographyDirective,
    CodeComponent,
    ExampleComponent,
    CppApplicationLayoutComponent,
    PdkMarginDirective,
    PdkCheckboxComponent,
    FormsModule,
    PropsListComponent,
    PropsListItemComponent
  ],
  providers: [SystemAnnouncementsService]
})
export class CppLayoutComponent {
  apiError = false;
  cookieMessage = false;
  html = html;
  offline = false;
  searchbar = false;

  constructor(cookiesService: CookiesService) {
    // reset cookies preferences state upon load
    cookiesService.resetCookiePreferences();
  }

  handleSearch(searchText: string) {
    console.log(`You submitted ${searchText}!`);
  }
}
