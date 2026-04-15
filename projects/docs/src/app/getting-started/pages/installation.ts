import { Component } from '@angular/core';
import { PdkTypographyDirective, PdkMarginDirective } from '@cpp/pdk';
import { PrismComponent } from '../../common/prism/prism.component';

const ngModule = `
import { NgModule } from '@angular/core';
import { PdkCore } from '@cpp/pdk';
import { AppComponent } from './app';

@NgModule({
  imports: [
    ...PdkCore
  ],
  bootstrap: [AppComponent]
})
export class AppComponent {}
`;

const component = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '
    <pdk-provider>
      ...
    </pdk-provider>
  '
})
export class AppComponent {}
`;

@Component({
  selector: 'docs-installation',
  template: `
    <span pdk-typography="caption-xlarge">Getting started</span>
    <h1 pdk-typography="heading-xlarge">Installation</h1>
    <p pdk-typography="body">
      The Platform Development Kit is available for Angular 19.x and higher, and can be installed
      via npm:
    </p>
    <docs-prism
      pdk-margin-bottom="4"
      language="typescript"
      code="npm install @cpp/pdk"
    ></docs-prism>
    <p pdk-typography="body">
      Your application should then be wrapped with the pdk-provider component to expose its core
      styles and functionality (Please note : If you use cpp-application component, you dont need to
      use this component, it is used internally):
    </p>
    <docs-prism pdk-margin-bottom="6" language="typescript" [code]="component"></docs-prism>
    <docs-prism pdk-margin-bottom="4" language="typescript" [code]="ngModule"></docs-prism>
  `,
  imports: [PdkTypographyDirective, PrismComponent, PdkMarginDirective]
})
export class InstallationComponent {
  ngModule = ngModule;
  component = component;
}
