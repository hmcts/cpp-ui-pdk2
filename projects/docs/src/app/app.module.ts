import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { provideCPPApplicationEnvironment } from '@cpp/application';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { DocsComponentsModule } from './components/components.module';
import { DocsGettingStartedModule } from './getting-started/getting-started.module';
import { DocsHomeModule } from './home/home.module';
import { DocsPatternsModule } from './patterns/patterns.module';
import { DocsStylesModule } from './styles/styles.module';
import { NavigationToggleComponent } from './common/navigation-toggle/navigation-toggle.component';
import { PaneComponent } from './common/pane/pane.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { MobileNavComponent } from './common/navigation-mobile/mobile-nav.component';
import { PdkCore, PdkFooter, PdkHeader, PdkSkipLinkComponent } from '@cpp/pdk';
import { HTTP_CONFIG, provideCppCoreHttpServices } from '@cpp/core';
import { addressLookupStubInterceptor } from './common/address-lookup-stub.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    DocsHomeModule,
    DocsComponentsModule,
    DocsGettingStartedModule,
    DocsPatternsModule,
    DocsStylesModule,
    NavigationToggleComponent,
    PaneComponent,
    NavigationComponent,
    MobileNavComponent,
    PdkSkipLinkComponent,
    ...PdkHeader,
    ...PdkCore,
    ...PdkFooter
  ],
  bootstrap: [AppComponent],
  providers: [
    provideCppCoreHttpServices(
      [{ provide: HTTP_CONFIG, useValue: { baseUrl: '' } }],
      addressLookupStubInterceptor
    ),
    provideCPPApplicationEnvironment({ production: false })
  ]
})
export class AppModule {}
