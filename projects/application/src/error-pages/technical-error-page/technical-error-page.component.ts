import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PdkLinkDirective, PdkTypographyDirective } from '@cpp/pdk';

@Component({
  selector: '[cpp-application-technical-error-page], cpp-application-technical-error-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 pdk-typography="heading-xlarge">
      Technical error <br />
      <span pdk-typography="heading-large">There was a problem </span>
    </h1>
    <div>
      <p pdk-typography="body-small">
        Check you’ve entered the web address correctly or
        <a [routerLink]="['/']" pdk-link>go to the home page</a> - any unsaved changes may be lost.
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PdkTypographyDirective, PdkLinkDirective, RouterLink]
})
export class TechnicalErrorPageComponent {}
