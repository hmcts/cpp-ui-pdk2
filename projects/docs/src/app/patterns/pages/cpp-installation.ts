import { Component } from '@angular/core';
import { PdkTypographyDirective, PdkMarginDirective } from '@cpp/pdk';
import { PrismComponent } from '../../common/prism/prism.component';

@Component({
  selector: 'docs-cookies',
  template: `
    <span pdk-typography="caption-xlarge">Common Platform</span>
    <h1 pdk-typography="heading-xlarge">Installation</h1>

    <p pdk-typography="body">
      The Common Platform application package is available for Angular 7.x and higher to keep your
      apps consistent with the rest of Common Platform, and can be installed via npm:
    </p>
    <docs-prism
      pdk-margin-bottom="4"
      language="typescript"
      code="npm install @cpp/application or npm install @cpp/application@specificversion"
    ></docs-prism>

    <p pdk-typography="body">This package makes available additional modules for layout,</p>
  `,
  imports: [PdkTypographyDirective, PrismComponent, PdkMarginDirective]
})
export class CppInstallationComponent {}
