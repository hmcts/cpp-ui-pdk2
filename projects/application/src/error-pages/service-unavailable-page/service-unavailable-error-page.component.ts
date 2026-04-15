import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { PdkTypographyDirective } from '@cpp/pdk';

@Component({
  selector:
    '[cpp-application-service-unavailable-error-page], cpp-application-service-unavailable-error-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 pdk-typography="heading-xlarge">Sorry this service is <br />currently unavailable</h1>
    <div>
      <p pdk-typography="body-small">
        We're working hard to get the service back up as soon as possible.
      </p>

      <p pdk-typography="body-small">Contact the help desk if you need to speak to someone.</p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PdkTypographyDirective]
})
export class ServiceUnavailableErrorPageComponent {}
