import { Pipe, PipeTransform } from '@angular/core';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
  SafeStyle,
  SafeUrl
} from '@angular/platform-browser';

export type PdkSanitizeType = 'html' | 'resourceUrl' | 'style' | 'url';

const blackList_REGEX =
  /((?!javascript:void\([\s\S]*\))javascript:+[\w\d\-]*\(?[\w\d]*\)?|<script[\s\S]*?>[\s\S]*?<\/script>|alert\(['"`]*[\w\d\s]*['"`]*\))/gim;

@Pipe({ name: 'pdkSanitize' })
export class PdkSanitizePipe implements PipeTransform {
  constructor(protected sanitizer: DomSanitizer) {}

  transform(
    value: string,
    type: PdkSanitizeType
  ): SafeHtml | SafeResourceUrl | SafeStyle | SafeUrl {
    if (this.isValueUnsafe(value)) {
      throw new Error(`The value provided is unsafe to sanitise or bypass.`);
    }

    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      default:
        throw new Error(`${type} is not a valid type to sanitize.`);
    }
  }

  isValueUnsafe(value: string) {
    return blackList_REGEX.test(value);
  }
}
