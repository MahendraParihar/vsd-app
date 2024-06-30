import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'vsd-ui-confirmation-menu',
  templateUrl: './ui-confirmation-menu.component.html',
  styleUrl: './ui-confirmation-menu.component.scss',
})
export class UiConfirmationMenuComponent {
  @Input() positiveBtnLabel!: string;
  @Input() negativeBtnLabel!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() icon!: string;
  @Output() positiveActionBtnClicked = new EventEmitter();
  @Output() negativeActionBtnClicked = new EventEmitter();

  onPositiveClick($event: Event) {
    this.positiveActionBtnClicked.emit($event);
  }

  onNegativeClick($event: Event) {
    this.negativeActionBtnClicked.emit($event);
  }
}
