import { Component, Input } from '@angular/core';
import { AbstractControl, AbstractControlDirective } from '@angular/forms';

@Component({
  selector: 'vsd-ui-input-error',
  templateUrl: './ui-input-error.component.html',
  styleUrl: './ui-input-error.component.scss',
})
export class UiInputErrorComponent {
  @Input()
  public control?: AbstractControlDirective | AbstractControl | null;

  @Input()
  public controlName?: string;

  shouldShowErrors(): boolean | null {
    if (this.control) {
      return (
        this.control.errors && (this.control.dirty || this.control.touched)
      );
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
          return this.controlName + ' is required';
        } else {
          return 'requried';
        }
      case 'invalidNumber':
        return 'Invalid number';
      case 'matDatepickerParse':
        return 'Invalid date';
      case 'maxlength':
        return 'Invalid max length' + params.requiredLength;
      case 'minlength':
        return 'Invalid min length' + params.requiredLength;
      case 'invalidWeight':
        return 'Invalid weight';
      case 'invalidHeight':
        return 'Invalid height';
      case 'min':
        return 'Invalid min value' + params.min;
      case 'max':
        return 'Invalid max value' + params.max;
      case 'invalidLatitude':
        return 'Invalid latitude';
      case 'invalidLongitude':
        return 'Invalid longitude';
      default:
        return null;
    }
  }
}
