import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { PdkTypographyDirective } from '@cpp/pdk';

@Component({
  selector: '[cpp-application-unauthorised-page], cpp-application-unauthorised-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 pdk-typography="heading-xlarge">
      Error 403 - Forbidden <br />
      <span pdk-typography="heading-large">You’re not authorised to view this page </span>
    </h1>
    <div>
      <p pdk-typography="body-small">
        You don't have access to this role. Contact your Common Platform administrator If you think
        you should.
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PdkTypographyDirective]
})
export class UnauthorisedPageComponent {}
