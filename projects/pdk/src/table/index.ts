import { PdkSortableHeaderComponent, SortOrder } from './sort';

import {
  PdkTableComponent,
  PdkTableCaptionDirective,
  PdkTableHeadDirective,
  PdkTableHeaderDirective,
  PdkTableBodyDirective,
  PdkTableRowDirective,
  PdkTableCellDirective
} from './table';

export const PdkTable = [
  PdkTableComponent,
  PdkTableCaptionDirective,
  PdkTableHeadDirective,
  PdkTableHeaderDirective,
  PdkTableBodyDirective,
  PdkTableRowDirective,
  PdkTableCellDirective,
  PdkSortableHeaderComponent
] as const;
export {
  SortOrder,
  PdkTableComponent,
  PdkTableCaptionDirective,
  PdkTableHeadDirective,
  PdkTableHeaderDirective,
  PdkTableBodyDirective,
  PdkTableRowDirective,
  PdkTableCellDirective,
  PdkSortableHeaderComponent
};
