import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkNotificationBannerComponent,
  PdkMarginDirective,
  PdkNotificationBannerLinkDirective
} from '@cpp/pdk';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';
import { ExampleComponent } from '../../common/example/example.component';

const markup = `
<pdk-notification-banner title="Important">
  <h3 pdk-margin-top="1" pdk-typography="heading-small">
    You have 7 days left to send your application.
  </h3>
  <h3 pdk-margin-top="1" pdk-typography="heading-small">
    If you have any trouble sending your application, please contact support.
    <a pdk-notification-banner-link href="javascript:void(0)">View application</a>
  </h3>
</pdk-notification-banner>
`;

@Component({
  selector: 'docs-phase-banner',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Notification Banner</h1>
    </docs-example-header>

    <p pdk-typography="body">
      Use a notification banner to tell the user about something they need to know about, but that’s
      not directly related to the page content. The usage guidelines and related research for this
      component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/notification-banner">here</a
      >.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkNotificationBanner</code> to your list of
      ngModule / standalone component imports.
    </p>

    <docs-example [html]="html">
      <pdk-notification-banner title="Important">
        <h3 pdk-margin-top="1" pdk-typography="heading-small">
          You have 7 days left to send your application.
        </h3>
        <h3 pdk-margin-top="1" pdk-typography="heading-small">
          If you have any trouble sending your application, please contact support.
          <a pdk-notification-banner-link href="javascript:void(0)">View application</a>
        </h3>
      </pdk-notification-banner>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>

    <h3 pdk-typography="heading-medium">pdk-notification-banner</h3>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content of the navigation banner.
      </docs-props-list-item>
      <docs-props-list-item name="title" type="string" defaultValue="Important">
        The title of the notification banner.
      </docs-props-list-item>
      <docs-props-list-item name="titleId" type="string" defaultValue="Internally generated Id">
        The unique id for the notification banner's title node element.
      </docs-props-list-item>
      <docs-props-list-item name="type" type="success | neutral" defaultValue="neutral">
        The notification type to be displayed.
      </docs-props-list-item>
      <docs-props-list-item name="role" type="region | alert" defaultValue="region">
        The notification role for accessibility.
      </docs-props-list-item>
    </docs-props-list>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    CodeComponent,
    ExampleComponent,
    PdkNotificationBannerComponent,
    PdkMarginDirective,
    PdkNotificationBannerLinkDirective,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class NotificationBannerComponent {
  html = markup;
}
