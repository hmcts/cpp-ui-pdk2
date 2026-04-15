import { Component } from '@angular/core';
import { PdkTypographyDirective } from '@cpp/pdk';

@Component({
  selector: 'docs-accessibility',
  template: `
    <span pdk-typography="caption-xlarge">Styles</span>
    <h1 pdk-typography="heading-xlarge">Accessibility</h1>
    <p pdk-typography="body-medium">
      By default, components with the Platform Development Kit will apply all necessary ARIA
      attributes and semantic markup using its input props. There are some instances, however, where
      the UX of a page will demand that further bespoke accessibility be added.
    </p>

    <!-- Example -->

    <h2 pdk-typography="heading-medium">Api</h2>

    <h3 pdk-typography="heading-small">[pdk-visually-hidden]</h3>
    <p pdk-typography="body">
      Add this to directive to an element or component to hide it from screens, but keep it visible
      to screen readers.
    </p>

    <h3 pdk-typography="heading-small">[pdk-focusable]</h3>
    <p pdk-typography="body">
      Add this directive to make an element focusable. It will add the element to the tabIndex and
      when focused will display with the GOV.UK outline used to represent focus.
    </p>

    <h3 pdk-typography="heading-small">[pdk-focused]</h3>
    <p pdk-typography="body">
      Add this to directive to decorate an element with the GOV.UK outline used to represent focus.
    </p>

    <h3 pdk-typography="heading-small">[pdk-focus-trap]</h3>
    <p pdk-typography="body">
      Add this to directive to an element to trap focus within the element's boundary.
    </p>
  `,
  imports: [PdkTypographyDirective]
})
export class AccessibilityComponent {}
