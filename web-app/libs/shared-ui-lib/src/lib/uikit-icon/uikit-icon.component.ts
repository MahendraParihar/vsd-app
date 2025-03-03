import { Component, Input, OnChanges } from '@angular/core';
import { IconNameType, IconSizeType } from '@vsd-common/lib';

@Component({
  selector: 'shared-ui-lib-uikit-icon',
  templateUrl: './uikit-icon.component.html',
  standalone: false,
  styleUrl: './uikit-icon.component.scss',
})
export class UikitIconComponent implements OnChanges {
  class = '';
  iconSize = 'regular';
  @Input() label = '';
  @Input() tooltipText = this.label;
  @Input() showTooltip = false;
  @Input() color: 'primary' | 'warn' | 'accent' = 'primary';
  @Input() showHoverState: boolean = false;

  constructor() {
    this.setClass();
  }

  private _name: IconNameType | '' = '';

  @Input() set name(input: IconNameType | string) {
    this._name = input as IconNameType;
    this.setClass();
  }

  private _size: IconSizeType = 'regular';

  @Input() set size(input: IconSizeType) {
    this._size = input;
    this.setClass();
  }

  ngOnChanges(): void {
    this.iconSize = this._size;
  }

  private setClass() {
    if (this._name !== '') {
      this.class = this.valueToClass(this._name) + '-' + this.sizeToClass(this._size);
    }
  }

  private valueToClass(value: IconNameType) {
    return 'icon-' + value;
  }

  private sizeToClass(value: IconSizeType) {
    if (value === 'none') {
      return '';
    }
    return '' + value;
  }
}
