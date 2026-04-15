import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DatePickerInputComponent } from '../components/pages/date-picker-input';
import { LayoutComponent } from './components.layout';
import { AccordionComponent } from './pages/accordion';
import { ActionButtonComponent } from './pages/action-button';
import { ActionDetailsComponent } from './pages/action-details';
import { ActivityIndicatorComponent } from './pages/activity-indicator';
import { AlertComponent } from './pages/alert';
import { ArrowLinkComponent } from './pages/arrow-link';
import { AutosuggestComponent } from './pages/autosuggest';
import { AutosuggestLiteComponent } from './pages/autosuggest-lite';
import { BackLinkComponent } from './pages/back-link';
import { BadgeComponent } from './pages/badge';
import { BreadcrumbsComponent } from './pages/breadcrumbs';
import { ButtonComponent } from './pages/button';
import { CharacterCountComponent } from './pages/character-count';
import { CheckboxesComponent } from './pages/checkboxes';
import { CollapsableComponent } from './pages/collapsable';
import { ContextPanelComponent } from './pages/context-panel';
import { CookieBannerComponent } from './pages/cookie-banner';
import { CookieMessageComponent } from './pages/cookie-message';
import { CurrencyInputComponent } from './pages/currency-input';
import { DateInputComponent } from './pages/date-input';
import { DetailsComponent } from './pages/details';
import { DividerComponent } from './pages/divider';
import { DropdownComponent } from './pages/dropdown';
import { ErrorSummaryComponent } from './pages/error-summary';
import { FileUploadComponent } from './pages/file-upload';
import { FoldableTextComponent } from './pages/foldable-text';
import { FooterComponent } from './pages/footer';
import { FormsComponent } from './pages/forms';
import { HeaderComponent } from './pages/header';
import { IconsComponent } from './pages/icons';
import { InsetTextComponent } from './pages/inset-text';
import { MastheadComponent } from './pages/masthead';
import { OverviewComponent } from './pages/overview';
import { PageHeaderComponent } from './pages/page-header';
import { PaginationComponent } from './pages/pagination';
import { PanelComponent } from './pages/panel';
import { PhaseBannerComponent } from './pages/phase-banner';
import { RadiosComponent } from './pages/radios';
import { RelatedComponent } from './pages/related';
import { SearchbarComponent } from './pages/searchbar';
import { SelectComponent } from './pages/select';
import { ServiceNavigationComponent } from './pages/service-navigation';
import { SkipLinkComponent } from './pages/skip-link';
import { SummaryItemComponent } from './pages/summary-item';
import { SummaryListComponent } from './pages/summary-list';
import { TableComponent } from './pages/table';
import { TabsComponent } from './pages/tabs';
import { TabsNavigationComponent } from './pages/tabs-navigation';
import { TagComponent } from './pages/tag';
import { TextInputComponent } from './pages/text-input';
import { TextareaComponent } from './pages/textarea';
import { TimeInputComponent } from './pages/time-input';
import { WarningTextComponent } from './pages/warning-text';
import { RichTextInputComponent } from './pages/rich-text-input';
import { NotificationBannerComponent } from './pages/notification-banner';
import { MultiSelectComponent } from './pages/multiselect';
import { FormsModule } from '@angular/forms';

const PAGES = [
  AccordionComponent,
  ActionButtonComponent,
  ActionDetailsComponent,
  ActivityIndicatorComponent,
  AlertComponent,
  ArrowLinkComponent,
  AutosuggestComponent,
  AutosuggestLiteComponent,
  BackLinkComponent,
  BadgeComponent,
  BreadcrumbsComponent,
  ButtonComponent,
  CharacterCountComponent,
  CheckboxesComponent,
  CollapsableComponent,
  ContextPanelComponent,
  CookieBannerComponent,
  CookieMessageComponent,
  CurrencyInputComponent,
  DateInputComponent,
  DatePickerInputComponent,
  DetailsComponent,
  DividerComponent,
  DropdownComponent,
  ErrorSummaryComponent,
  FileUploadComponent,
  FoldableTextComponent,
  FooterComponent,
  FormsComponent,
  HeaderComponent,
  IconsComponent,
  InsetTextComponent,
  LayoutComponent,
  MastheadComponent,
  MultiSelectComponent,
  NotificationBannerComponent,
  OverviewComponent,
  PageHeaderComponent,
  PanelComponent,
  PaginationComponent,
  PhaseBannerComponent,
  RadiosComponent,
  RelatedComponent,
  RichTextInputComponent,
  SearchbarComponent,
  SelectComponent,
  ServiceNavigationComponent,
  SkipLinkComponent,
  SummaryItemComponent,
  SummaryListComponent,
  TableComponent,
  TabsComponent,
  TabsNavigationComponent,
  TagComponent,
  TextareaComponent,
  TextInputComponent,
  TimeInputComponent,
  WarningTextComponent
];

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, ...PAGES],
  exports: PAGES
})
export class DocsComponentsModule {}
