import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'pdk-character-count',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (remaining >= 0) {
    <span class="govuk-hint govuk-character-count__message" aria-live="polite">
      You have {{ remaining }} character{{ remaining === 1 ? '' : 's' }} remaining
    </span>
    } @if (remaining < 0) {
    <span class="govuk-character-count__message govuk-error-message" aria-live="polite">
      You have {{ 0 - remaining }} character{{ remaining === -1 ? '' : 's' }} too many
    </span>
    }
  `,
  styleUrls: ['./character-count.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkCharacterCountComponent implements OnChanges {
  @Input() value = '';
  @Input() limit = 0;

  remaining = 0;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value || changes.limit) {
      this.remaining = this.value ? this.limit - this.value.length : this.limit;
    }
  }
}
