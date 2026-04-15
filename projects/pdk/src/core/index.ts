import { PdkVisuallyHiddenDirective } from './accessibility';
import {
  PdkBorderColorDirective,
  PdkFillColorDirective,
  PdkTextColorDirective,
  PdkColor,
  PdkColorTint
} from './colour';
import { PdkFocusableDirective, PdkFocusedDirective } from './focusable';
import { PdkInteractionContainerComponent } from './interaction';
import { PdkLinkDirective } from './links';
import { PdkListDirective, ListType } from './lists';
import { PdkContainerStyleDirective, PdkMainComponent } from './main';
import { PdkMobileDirective } from './media';
import { PdkProviderComponent } from './provider.component';
import { PdkSanitizePipe, PdkSanitizeType } from './sanitize.pipe';
import { PdkSectionBreakDirective, SectionType } from './section-break';
import {
  PdkMarginDirective,
  PdkPaddingDirective,
  PaddingUnit,
  MarginUnit,
  SpacingUnit
} from './spacing';
import { PdkTypographyDirective, TypographyType } from './typography';
import { PdkFocusTrapComponent } from './focus-trap';

export const PdkCore = [
  PdkContainerStyleDirective,
  PdkBorderColorDirective,
  PdkProviderComponent,
  PdkFillColorDirective,
  PdkFocusableDirective,
  PdkFocusTrapComponent,
  PdkFocusedDirective,
  PdkInteractionContainerComponent,
  PdkLinkDirective,
  PdkListDirective,
  PdkMainComponent,
  PdkMarginDirective,
  PdkMobileDirective,
  PdkPaddingDirective,
  PdkSectionBreakDirective,
  PdkTextColorDirective,
  PdkTypographyDirective,
  PdkVisuallyHiddenDirective,
  PdkSanitizePipe
] as const;

export {
  PdkColor,
  PdkColorTint,
  ListType,
  PaddingUnit,
  SpacingUnit,
  MarginUnit,
  SectionType,
  TypographyType,
  PdkSanitizeType,
  PdkBorderColorDirective,
  PdkContainerStyleDirective,
  PdkProviderComponent,
  PdkFillColorDirective,
  PdkFocusableDirective,
  PdkFocusTrapComponent,
  PdkFocusedDirective,
  PdkInteractionContainerComponent,
  PdkLinkDirective,
  PdkListDirective,
  PdkMainComponent,
  PdkMarginDirective,
  PdkMobileDirective,
  PdkPaddingDirective,
  PdkSectionBreakDirective,
  PdkTextColorDirective,
  PdkTypographyDirective,
  PdkVisuallyHiddenDirective,
  PdkSanitizePipe
};
export * from './modal';
export * from './modal-provider';
