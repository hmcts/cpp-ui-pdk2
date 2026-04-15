import { inject, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { PdkSanitizePipe } from '../sanitize.pipe';

describe('pdkSanitize', () => {
  let sanitizePipe: PdkSanitizePipe;
  const bypassSecurityTrustHtml = jest.fn((value: string) => `safe html ${value}`);
  const bypassSecurityTrustStyle = jest.fn((value: string) => `safe style ${value}`);
  const bypassSecurityTrustUrl = jest.fn((value: string) => `safe url ${value}`);
  const bypassSecurityTrustResourceUrl = jest.fn((value: string) => `safe resourceUrl ${value}`);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PdkSanitizePipe,
        {
          provide: DomSanitizer,
          useValue: {
            bypassSecurityTrustHtml,
            bypassSecurityTrustStyle,
            bypassSecurityTrustUrl,
            bypassSecurityTrustResourceUrl
          }
        }
      ]
    });
  });

  beforeEach(inject([PdkSanitizePipe], (pipe: PdkSanitizePipe) => (sanitizePipe = pipe)));

  it('should transform html', () => {
    const html = `<div class="1"> test </div>`;
    expect(sanitizePipe.transform(html, 'html')).toMatchSnapshot();
  });

  it('should transform style', () => {
    const style = `h1{color:red;}`;
    expect(sanitizePipe.transform(style, 'style')).toMatchSnapshot();
  });

  it('should transform url', () => {
    const href = `http:\\test.com`;
    expect(sanitizePipe.transform(href, 'url')).toMatchSnapshot();
  });

  it('should transform resourceUrl', () => {
    const resourceUrl = `data:image/jpeg;base64`;
    expect(sanitizePipe.transform(resourceUrl, 'resourceUrl')).toMatchSnapshot();
  });

  it('should sanitize a suspicious javascript process and throw error', () => {
    const href = `javascript:killProcess(0);`;
    expect(() => sanitizePipe.transform(href, 'url')).toThrow(
      `The value provided is unsafe to sanitise or bypass.`
    );
  });

  it('should sanitize a suspicious script and throw error', () => {
    const url = `<script type="text/javascript"> alert(); </script>`;
    expect(() => sanitizePipe.transform(url, 'url')).toThrow(
      `The value provided is unsafe to sanitise or bypass.`
    );
  });
});
