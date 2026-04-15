import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { PdkTypographyDirective } from '@cpp/pdk';

@Component({
  selector: '[cpp-application-not-found-page], cpp-application-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 pdk-typography="heading-xlarge">
      Error 404 - Not found <br />
      <span pdk-typography="heading-large">There was a problem </span>
    </h1>
    <div>
      <p pdk-typography="body-small">
        Make sure you’ve entered the web address correctly. Contact the help desk if this doesn’t
        work.
      </p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PdkTypographyDirective]
})
export class NotFoundPageComponent {}
