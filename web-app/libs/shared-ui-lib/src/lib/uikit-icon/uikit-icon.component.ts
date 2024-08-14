import { Component, Input, OnChanges } from '@angular/core';

export type IconNameType = 'header-logo' | 'logo';
export type IconSizeType = 'none' | 'small' | 'medium' | 'regular' | 'large';

@Component({
  selector: 'shared-ui-lib-uikit-icon',
  templateUrl: './uikit-icon.component.html',
  styleUrl: './uikit-icon.component.scss',
})
export class UikitIconComponent implements OnChanges {
  private _name: IconNameType | '' = '';
  private _size: IconSizeType = 'regular';
  class = '';
  iconSize = 'regular';

  @Input() label = '';
  @Input() tooltipText = this.label;
  @Input() showTooltip = false;

  @Input() set size(input: IconSizeType) {
    this._size = input;
    this.setClass();
  }

  @Input() set name(input: IconNameType) {
    this._name = input;
    this.setClass();
  }

  constructor() {
    this.setClass();
  }

  ngOnChanges(): void {
    this.iconSize = this._size;
  }

  private setClass() {
    if (this._name !== '') {
      this.class =
        this.valueToClass(this._name) + '-' + this.sizeToClass(this._size);
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
