import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconNameType, IconSizeType } from '@vsd-common/lib';

@Component({
  selector: 'shared-ui-lib-uikit-button',
  templateUrl: './uikit-button.component.html',
  standalone: false,
  styleUrl: './uikit-button.component.scss',
})
export class UikitButtonComponent {
  @Input() label!: string;
  @Input() suffixIcon!: IconNameType;
  @Input() suffixIconSize: IconSizeType = 'regular';
  @Input() prefixIcon!: IconNameType | string;
  @Input() prefixIconSize: IconSizeType = 'regular';
  @Input() disableRipple = false;
  @Input() type: 'regular' | 'raised' | 'stroked' | 'flat' | 'icon-only' | 'link' = 'regular';
  @Input() color: 'primary' | 'warn' | 'accent' | 'light' = 'primary';
  @Input() hasUnderline = false;

  @Output() buttonClicked: EventEmitter<Event> = new EventEmitter();

  onClick(event: Event) {
    this.buttonClicked.emit(event);
  }
}
