import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'vsd-ui-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() type:
    | 'regular'
    | 'blue'
    | 'red'
    | 'yellow'
    | 'green'
    | 'success'
    | 'warning'
    | 'error' = 'regular';
  @Input() tooltip!: string;
  @Input() disabled = false;
  @Input() disableRipple = false;
  @Input() tabIndex = 0;
  @Input() truncateLength = 40;
  @Input() prefixIcon = false;
  @Input() prefixIconName!: string;
  @Output() actionBtnClicked = new EventEmitter();
  @ViewChild('btnEle') btnEle!: MatButton;

  onActionBtnClick(event: Event) {
    this.actionBtnClicked.emit(event);
  }

  public buttonFocus() {
    this.btnEle.focus();
  }

  findClass() {
    switch (this.type) {
      default:
      case 'regular':
        return 'btn gradient-btn';
      case 'blue':
        return 'btn blue-gradient-btn';
      case 'red':
        return 'btn red-gradient-btn';
      case 'yellow':
        return 'btn yellow-gradient-btn';
      case 'green':
        return 'btn green-gradient-btn';
      case 'success':
        return 'btn success-btn';
      case 'warning':
      case 'error':
        return 'btn warning-btn';
    }
  }
}
