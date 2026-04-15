import {
  PdkFooterComponent,
  PdkFooterLinkDirective,
  PdkFooterListComponent,
  PdkFooterListItemComponent,
  PdkFooterMetaComponent
} from './footer.component';

export const PdkFooter = [
  PdkFooterComponent,
  PdkFooterLinkDirective,
  PdkFooterMetaComponent,
  PdkFooterListComponent,
  PdkFooterListItemComponent
] as const;

export {
  PdkFooterComponent,
  PdkFooterLinkDirective,
  PdkFooterMetaComponent,
  PdkFooterListComponent,
  PdkFooterListItemComponent
};
