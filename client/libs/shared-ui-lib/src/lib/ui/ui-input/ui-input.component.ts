import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  AbstractControlDirective,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'vsd-ui-input',
  templateUrl: './ui-input.component.html',
  styleUrl: './ui-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => UiInputComponent),
    },
  ],
})
export class UiInputComponent {
  @Input() control!: AbstractControlDirective | AbstractControl | null;
  @Input() placeholder = '';
  @Input() label!: string;
  @Input() showLabel = true;
  @Input() required = false;
  @Input() readonly = false;
  @Input() isDisabled = false;
  @Input() autoComplete = 'off';
  @Input() tooltip!: string;
  @Input() ngModel: unknown;
  @Input() maxLength = 500;
  @Input() customErrorBorder = false;
  @Input() minVal?: number;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() ngModelChange = new EventEmitter<any>();

  @ViewChild('inputField', { static: false }) public inputText:
    | ElementRef
    | undefined;

  inputType = 'text';

  @Input() set type(mInputType: string) {
    this.inputType = mInputType;
  }

  @Output() inputChange = new EventEmitter<Event>();
  @Output() inputBlur = new EventEmitter<Event>();
  @Output() inputFocus = new EventEmitter<Event>();

  onBlur(event: Event) {
    this.inputBlur.emit(event);
  }

  onFocus(event: Event) {
    this.inputFocus.emit(event);
  }

  onInputChange(event: Event) {
    this.inputChange.emit(event);
    this.ngModelChange.emit((<HTMLInputElement>event.target).value);
  }

  setAttribute(attribute: string, value: number) {
    (this.inputText as ElementRef).nativeElement.setAttribute(attribute, value);
  }

  focusEle() {
    (this.inputText as ElementRef).nativeElement.focus();
  }
}
