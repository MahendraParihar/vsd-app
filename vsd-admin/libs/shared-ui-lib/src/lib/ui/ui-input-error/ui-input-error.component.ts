import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';
import { LabelKey } from '@vsd-common/lib';

@Component({
  selector: 'shared-ui-lib-input-error',
  standalone: false,
  templateUrl: './ui-input-error.component.html',
  styleUrl: './ui-input-error.component.scss',
})
export class UiInputErrorComponent {
  @Input()
  public control?: AbstractControlDirective | AbstractControl | null;
  @Input()
  public controlName?: string;
  @Input()
  public labels: Map<string, string> = new Map<string, string>();

  shouldShowErrors(): boolean | null {
    if (this.control) {
      return this.control.errors && (this.control.dirty || this.control.touched);
    } else {
      return false;
    }
  }

  getError(): string[] | null {
    if (this.control) {
      for (const k in this.control.errors) {
        return this.getMessage(k, this.control.errors[k]);
      }
    }
    return null;
  }

  private getMessage(type: string, params: any): any {
    switch (type) {
      case 'required':
        if (this.controlName) {
          return this.controlName + ' ' + this.labels.get(LabelKey.ERROR_REQUIRED);
        } else {
          return this.labels.get(LabelKey.ERROR_REQUIRED);
        }
      case 'invalidNumber':
        return 'Invalid number';
      case 'matDatepickerParse':
        return this.labels.get(LabelKey.ERROR_IN_VALID_DATE);
      case 'maxlength':
        return this.labels.get(LabelKey.ERROR_IN_VALID_MAX_LENGTH) + params.requiredLength;
      case 'minlength':
        return this.labels.get(LabelKey.ERROR_IN_VALID_MIN_LENGTH) + params.requiredLength;
      case 'min':
        return this.labels.get(LabelKey.ERROR_IN_VALID_MIN_VALUE) + params.min;
      case 'max':
        return this.labels.get(LabelKey.ERROR_IN_VALID_MAX_VALUE) + params.max;
      default:
        return null;
    }
  }
}
