import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PdkTypographyDirective } from '@cpp/pdk';

@Component({
  selector: '[cpp-application-download-error-page], cpp-application-download-error-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 pdk-typography="heading-xlarge">
      Download error <br />
      <span pdk-typography="heading-large">There was a problem </span>
    </h1>

    <div>
      @if (error) {
      <p pdk-typography="body-small">{{ error }}</p>
      } @else {
      <p pdk-typography="body-small">
        Please try again in a few minutes. Contact the help desk if this doesn’t work.
      </p>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PdkTypographyDirective]
})
export class DownloadErrorPageComponent {
  error: string | null;
  constructor(route: ActivatedRoute) {
    this.error = route.snapshot.queryParamMap.get('error');
  }
}
