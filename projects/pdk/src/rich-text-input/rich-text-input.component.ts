import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Type,
  viewChild,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, FormsModule } from '@angular/forms';
import {
  AngularEditorComponent,
  AngularEditorConfig,
  AngularEditorModule
} from '@kolkov/angular-editor';
import { FormFieldControl } from '../form/form.interfaces';
import { generateId } from '../util';

type Alignment = 'left' | 'right' | 'center' | 'justified';
type ListType = 'bullet' | 'ordered';
type Style = 'bold' | 'italic' | 'underline' | 'strikethrough';
type Indentation = 'allowIndent' | 'allowOutdent';

@Component({
  selector: 'pdk-rich-text-input',
  template: `
    <angular-editor
      [id]="id"
      role="textbox"
      [ngModel]="value"
      (ngModelChange)="emitChange($event)"
      [config]="config"
    >
    </angular-editor>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./rich-text-input.scss'],
  providers: [
    {
      provide: FormFieldControl,
      useExisting: PdkRichTextInputComponent
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdkRichTextInputComponent),
      multi: true
    }
  ],
  imports: [AngularEditorModule, FormsModule]
})
export class PdkRichTextInputComponent
  implements ControlValueAccessor, FormFieldControl, OnInit, AfterViewInit, OnDestroy
{
  private readonly _defaultConfig = [
    'undo',
    'redo',
    'bold',
    'italic',
    'underline',
    'strikeThrough',
    'subscript',
    'superscript',
    'justifyLeft',
    'justifyCenter',
    'justifyRight',
    'justifyFull',
    'indent',
    'outdent',
    'insertUnorderedList',
    'insertOrderedList',
    'heading',
    'fontName'
  ];
  private readonly _toolbarHiddenButtons = [
    'fontSize',
    'textColor',
    'backgroundColor',
    'customClasses',
    'link',
    'unlink',
    'insertImage',
    'insertVideo',
    'insertHorizontalRule',
    'removeFormat',
    'toggleEditorMode'
  ];

  config: AngularEditorConfig = {
    sanitize: false,
    editable: true,
    spellcheck: true,
    maxHeight: '800px',
    minHeight: '300px',
    placeholder: '',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']]
  };

  @Input() id: string;
  @Input() ariaDescribedBy: string | null;
  @Input() hasError = false;
  @Input() alignments: Alignment[] = ['left', 'center', 'right'];
  @Input() listTypes: ListType[] = ['bullet', 'ordered'];
  @Input() styles: Style[] = ['bold', 'italic', 'underline'];
  @Input() indentations: Indentation[] = [];
  @Input() overrideConfig: AngularEditorConfig = {};

  @Output() change = new EventEmitter<string>();

  @ViewChild('richTextInputRef') richTextInputRef!: ElementRef<HTMLDivElement>;
  @ViewChild(AngularEditorComponent, { read: ElementRef }) editorRef: ElementRef;
  readonly editor = viewChild.required(AngularEditorComponent);

  controlRef = computed(() => this.editor().textArea);
  controlType = 'rich-text';
  multi = false;
  value: string;

  ngOnInit(): void {
    const mappedAlignments: string[] = this.alignments.map((alignment) => {
      switch (alignment) {
        case 'center':
          return 'justifyCenter';
        case 'left':
          return 'justifyLeft';
        case 'right':
          return 'justifyRight';
        case 'justified':
          return 'justifyFull';
      }
    });

    const mappedListTypes: string[] = this.listTypes.map((listType) => {
      switch (listType) {
        case 'ordered':
          return 'insertOrderedList';
        case 'bullet':
          return 'insertUnorderedList';
      }
    });

    const mappedStyles: string[] = this.styles.map((style) =>
      style === 'strikethrough' ? 'strikeThrough' : style
    );

    const mappedIndents: string[] = this.indentations.map((indent) => {
      switch (indent) {
        case 'allowIndent':
          return 'indent';
        case 'allowOutdent':
          return 'outdent';
      }
    });

    const buttonConfig = this._defaultConfig
      .filter((item) => !mappedAlignments.includes(item))
      .filter((item) => !mappedListTypes.includes(item))
      .filter((item) => !mappedIndents.includes(item))
      .filter((item) => !mappedStyles.includes(item));

    this.config = {
      ...this.config,
      ...this.overrideConfig,
      toolbarHiddenButtons: [buttonConfig, this._toolbarHiddenButtons]
    };
  }

  private propagateChange = (_: string) => {};

  constructor(private injector: Injector, private changeDetector: ChangeDetectorRef) {
    this.id = generateId('pdk-rich-text-input');
  }

  get ngControl() {
    return this.injector.get(NgControl as Type<NgControl>);
  }

  ngAfterViewInit() {
    const editor = this.editor();
    if (editor.textArea) {
      editor.textArea.nativeElement.addEventListener('keydown', this.onKeDownPress);
    }
  }

  ngOnDestroy() {
    const editor = this.editor();
    if (editor.textArea) {
      editor.textArea.nativeElement.removeEventListener('keydown', this.onKeDownPress);
    }
  }

  emitChange(html: string) {
    this.propagateChange(html);
    this.change.emit(html);
  }

  registerOnChange(fn: (_: any) => void): void {
    this.propagateChange = fn.bind(this);
  }

  registerOnTouched(_: any) {}

  writeValue(text: string | undefined) {
    this.value = text;
    this.changeDetector.markForCheck();
  }

  private onKeDownPress = (event: KeyboardEvent) => {
    const editor = this.editor();
    switch (event.key) {
      case 'Tab':
        event.preventDefault();
        if (event.shiftKey) {
          return editor.executeCommand('outdent');
        }
        return editor.executeCommand('indent');
      default:
        break;
    }
  };
}
