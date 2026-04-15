import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkLinkDirective,
  PdkFooterComponent as FooterComponent_1,
  PdkFooterMetaComponent,
  PdkFooterLinkDirective,
  PdkFooterListComponent,
  PdkFooterListItemComponent
} from '@cpp/pdk';
import { ExampleComponent } from '../../common/example/example.component';
import {
  CodeComponent,
  PropsListComponent,
  PropsListItemComponent
} from '../../common/props-list/props-list';

const markup = `
<pdk-footer>
  <pdk-footer-meta>
    <h2 pdk-typography="heading-medium">Help desk</h2>
    <dl>
      <dt>CPS (Crown Prosecution Service) users only</dt>
      <dd><a pdk-footer-link href="#"> CJSCP-ServiceDesk@hmcts.gsi.gov.uk </a></dd>
    </dl>
  </pdk-footer-meta>
  <pdk-footer-list>
    <pdk-footer-list-item>
      <a pdk-footer-link href="#">Terms and conditions</a>
    </pdk-footer-list-item>
    <pdk-footer-list-item>
      <a pdk-footer-link href="#">Cookies</a>
    </pdk-footer-list-item>
  </pdk-footer-list>
</pdk-footer>
`;

@Component({
  selector: 'docs-footer',
  template: `
    <docs-example-header origin="GOV.UK">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Footer</h1>
    </docs-example-header>
    <p pdk-typography="body">
      The footer provides copyright, licensing and other information about your service and
      department. The usage guidelines and related research for this component can be found
      <a pdk-link href="https://design-system.service.gov.uk/components/footer">here</a>.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Example</h2>

    <docs-example [html]="html">
      <pdk-footer>
        <pdk-footer-meta>
          <h2 pdk-typography="heading-medium">Help desk</h2>
          <dl>
            <dt>CPS (Crown Prosecution Service) users only</dt>
            <dd><a pdk-footer-link href="#"> CJSCP-ServiceDesk&#64;hmcts.gsi.gov.uk </a></dd>
          </dl>
        </pdk-footer-meta>
        <pdk-footer-list>
          <pdk-footer-list-item>
            <a pdk-footer-link href="javascript:void(0)">Terms and conditions</a>
          </pdk-footer-list-item>
          <pdk-footer-list-item>
            <a pdk-footer-link href="javascript:void(0)">Cookies</a>
          </pdk-footer-list-item>
        </pdk-footer-list>
      </pdk-footer>
    </docs-example>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>
    <p pdk-typography="body">
      To use this component, add <code docs-code>PdkFooter</code> to your list of ngModule/
      standalone component imports.
    </p>

    <h3 pdk-typography="heading-medium">pdk-footer</h3>
    <p>The outer container for all footer content.</p>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-footer-meta</h3>
    <p>An internal responsive block of footer content.</p>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-footer-list</h3>
    <p>A sectioned list of inline items, typically for showing a row of links.</p>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">pdk-footer-list-item</h3>
    <p>An inline item with a footer list.</p>
    <docs-props-list>
      <docs-props-list-item name="ng-content" type="node">
        The content for the component.
      </docs-props-list-item>
    </docs-props-list>

    <h3 pdk-typography="heading-medium">[pdk-footer-link]</h3>
    <p>Styles any link used in your footer.</p>
  `,
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkLinkDirective,
    ExampleComponent,
    FooterComponent_1,
    PdkFooterMetaComponent,
    PdkFooterLinkDirective,
    PdkFooterListComponent,
    PdkFooterListItemComponent,
    CodeComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class FooterComponent {
  html = markup;
}
