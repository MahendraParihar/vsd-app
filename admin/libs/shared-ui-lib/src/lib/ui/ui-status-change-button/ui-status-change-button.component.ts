import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'vsd-ui-status-change-button',
  standalone: false,
  templateUrl: './ui-status-change-button.component.html',
  styleUrl: './ui-status-change-button.component.scss',
})
export class UiStatusChangeButtonComponent {

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  @Input() positiveBtnLabel!: string;
  @Input() negativeBtnLabel!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() status: boolean = true;
  @Output() positiveActionBtnClicked = new EventEmitter<boolean>();

  onPositiveClick() {
    this.positiveActionBtnClicked.emit(!this.status);
    this.onNegativeClick();
  }

  onNegativeClick() {
    if (this.trigger) {
      this.trigger.closeMenu();
    }
  }
}
