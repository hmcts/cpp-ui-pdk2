import { Route } from '@angular/router';
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
import { DatePickerInputComponent } from './pages/date-picker-input';
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
import { PasswordInputComponent } from './pages/password-input';

export const componentsRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: OverviewComponent,
        data: {
          title: 'Components overview'
        }
      },
      {
        path: 'accordion',
        component: AccordionComponent,
        data: {
          title: 'Accordion'
        }
      },
      {
        path: 'action-button',
        component: ActionButtonComponent,
        data: {
          title: 'Action button'
        }
      },
      {
        path: 'activity-indicator',
        component: ActivityIndicatorComponent,
        data: {
          title: 'Activity indicator'
        }
      },
      {
        path: 'action-details',
        component: ActionDetailsComponent,
        data: {
          title: 'Action details'
        }
      },
      {
        path: 'alert',
        component: AlertComponent,
        data: {
          title: 'Alert'
        }
      },
      {
        path: 'arrow-link',
        component: ArrowLinkComponent,
        data: {
          title: 'Arrow link'
        }
      },
      {
        path: 'autosuggest',
        component: AutosuggestComponent,
        data: {
          title: 'Autosuggest'
        }
      },
      {
        path: 'autosuggest-lite',
        component: AutosuggestLiteComponent,
        data: {
          title: 'Autosuggest (lite)'
        }
      },
      {
        path: 'back-link',
        component: BackLinkComponent,
        data: {
          title: 'Back link'
        }
      },
      {
        path: 'badge',
        component: BadgeComponent,
        data: {
          title: 'Badge'
        }
      },
      {
        path: 'breadcrumbs',
        component: BreadcrumbsComponent,
        data: {
          title: 'Breadcrumbs'
        }
      },
      {
        path: 'button',
        component: ButtonComponent,
        data: {
          title: 'Button'
        }
      },
      {
        path: 'character-count',
        component: CharacterCountComponent,
        data: {
          title: 'Character count'
        }
      },
      {
        path: 'checkboxes',
        component: CheckboxesComponent,
        data: {
          title: 'Checkboxes'
        }
      },
      {
        path: 'collapsable',
        component: CollapsableComponent,
        data: {
          title: 'Collapsable'
        }
      },
      {
        path: 'context-panel',
        component: ContextPanelComponent,
        data: {
          title: 'Context panel'
        }
      },
      {
        path: 'cookie-banner',
        component: CookieBannerComponent,
        data: {
          title: 'Cookie banner'
        }
      },
      {
        path: 'cookie-message',
        component: CookieMessageComponent,
        data: {
          title: 'Cookie message'
        }
      },
      {
        path: 'currency-input',
        component: CurrencyInputComponent,
        data: {
          title: 'Currency input'
        }
      },
      {
        path: 'date-input',
        component: DateInputComponent,
        data: {
          title: 'Date input'
        }
      },
      {
        path: 'date-picker-input',
        component: DatePickerInputComponent,
        data: {
          title: 'Date picker input'
        }
      },
      {
        path: 'details',
        component: DetailsComponent,
        data: {
          title: 'Details'
        }
      },
      {
        path: 'divider',
        component: DividerComponent,
        data: {
          title: 'Divider'
        }
      },
      {
        path: 'dropdown',
        component: DropdownComponent,
        data: {
          title: 'Dropdown'
        }
      },
      {
        path: 'error-summary',
        component: ErrorSummaryComponent,
        data: {
          title: 'Error summary'
        }
      },
      {
        path: 'file-upload',
        component: FileUploadComponent,
        data: {
          title: 'File upload'
        }
      },
      {
        path: 'foldable-text',
        component: FoldableTextComponent,
        data: {
          title: 'Foldable text'
        }
      },
      {
        path: 'footer',
        component: FooterComponent,
        data: {
          title: 'Footer'
        }
      },
      {
        path: 'form-field',
        component: FormsComponent,
        data: {
          title: 'Form field'
        }
      },
      {
        path: 'header',
        component: HeaderComponent,
        data: {
          title: 'Header'
        }
      },
      {
        path: 'icons',
        component: IconsComponent,
        data: {
          title: 'Icons'
        }
      },
      {
        path: 'forms',
        component: FormsComponent,
        data: {
          title: 'Forms'
        }
      },
      {
        path: 'inset-text',
        component: InsetTextComponent,
        data: {
          title: 'Inset text'
        }
      },
      {
        path: 'masthead',
        component: MastheadComponent,
        data: {
          title: 'Masthead'
        }
      },
      {
        path: 'multi-select',
        component: MultiSelectComponent,
        data: {
          title: 'Multi select'
        }
      },
      {
        path: 'notification-banner',
        component: NotificationBannerComponent,
        data: {
          title: 'Notification banner'
        }
      },
      {
        path: 'page-header',
        component: PageHeaderComponent,
        data: {
          title: 'Page header'
        }
      },
      {
        path: 'pagination',
        component: PaginationComponent,
        data: {
          title: 'Pagination'
        }
      },
      {
        path: 'panel',
        component: PanelComponent,
        data: {
          title: 'Panel'
        }
      },
      {
        path: 'password-input',
        component: PasswordInputComponent,
        data: {
          title: 'password input'
        }
      },
      {
        path: 'phase-banner',
        component: PhaseBannerComponent,
        data: {
          title: 'Phase banner'
        }
      },
      {
        path: 'radios',
        component: RadiosComponent,
        data: {
          title: 'Radios'
        }
      },
      {
        path: 'related',
        component: RelatedComponent,
        data: {
          title: 'Related'
        }
      },
      {
        path: 'rich-text-input',
        component: RichTextInputComponent,
        data: {
          title: 'Rich text input'
        }
      },
      {
        path: 'searchbar',
        component: SearchbarComponent,
        data: {
          title: 'Searchbar'
        }
      },
      {
        path: 'select',
        component: SelectComponent,
        data: {
          title: 'Select'
        }
      },
      {
        path: 'service-navigation',
        component: ServiceNavigationComponent,
        data: {
          title: 'Service navigation'
        }
      },
      {
        path: 'skip-link',
        component: SkipLinkComponent,
        data: {
          title: 'Skip link'
        }
      },
      {
        path: 'summary-item',
        component: SummaryItemComponent,
        data: {
          title: 'Summary item'
        }
      },
      {
        path: 'summary-list',
        component: SummaryListComponent,
        data: {
          title: 'Summary list'
        }
      },
      {
        path: 'table',
        component: TableComponent,
        data: {
          title: 'Table'
        }
      },
      {
        path: 'tag',
        component: TagComponent,
        data: {
          title: 'Tag'
        }
      },
      {
        path: 'tabs',
        component: TabsComponent,
        data: {
          title: 'Tabs'
        }
      },
      {
        path: 'tabs-navigation',
        component: TabsNavigationComponent,
        data: {
          title: 'Tabs navigation'
        }
      },
      {
        path: 'textarea',
        component: TextareaComponent,
        data: {
          title: 'Textarea'
        }
      },
      {
        path: 'text-input',
        component: TextInputComponent,
        data: {
          title: 'Text input'
        }
      },
      {
        path: 'time-input',
        component: TimeInputComponent,
        data: {
          title: 'Time input'
        }
      },
      {
        path: 'warning-text',
        component: WarningTextComponent,
        data: {
          title: 'Warning text'
        }
      }
    ]
  }
];
