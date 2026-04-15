import { Component } from '@angular/core';
import { HeaderComponent } from '../../common/example-header/example-header';
import {
  PdkTypographyDirective,
  PdkMarginDirective,
  PdkDocumentIconComponent,
  PdkFileDownloadIconComponent
} from '@cpp/pdk';
import { PropsListComponent, PropsListItemComponent } from '../../common/props-list/props-list';

const markup = `
<pdk-tag>Alpha</pdk-tag>
`;

@Component({
  selector: 'docs-icons',
  template: `
    <docs-example-header origin="CPP">
      <span pdk-typography="caption-xlarge">Components</span>
      <h1 pdk-typography="heading-xlarge">Icons</h1>
    </docs-example-header>
    <p pdk-typography="body">
      Icons alongside a title or description provide a visual aide to the user.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-large">Icons</h2>

    <div pdk-margin-bottom="6">
      <div pdk-margin-bottom="3">
        <pdk-document-icon [size]="50"></pdk-document-icon>
        <span class="docs-icon__label">pdk-document-icon</span>
      </div>
      <div pdk-margin-bottom="3">
        <pdk-file-download-icon [size]="50"></pdk-file-download-icon>
        <span class="docs-icon__label">pdk-file-download-icon</span>
      </div>
    </div>

    <!-- Api -->

    <h2 pdk-typography="heading-large">Api</h2>

    <docs-props-list>
      <docs-props-list-item name="size" type="number" defaultValue="32">
        The desktop size of the icon in pixels.
      </docs-props-list-item>
    </docs-props-list>
  `,
  styles: [
    `
      .docs-icon__label {
        display: inline-block;
        margin-left: 10px;
      }
    `
  ],
  imports: [
    HeaderComponent,
    PdkTypographyDirective,
    PdkMarginDirective,
    PdkDocumentIconComponent,
    PdkFileDownloadIconComponent,
    PropsListComponent,
    PropsListItemComponent
  ]
})
export class IconsComponent {
  html = markup;
}
