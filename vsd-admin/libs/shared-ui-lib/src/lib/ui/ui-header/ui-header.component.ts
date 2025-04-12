import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { LabelService, NavItem } from '@vsd-frontend/core-lib';
import { LabelKey } from '@vsd-common/lib';

@Component({
  selector: 'shared-ui-lib-ui-header',
  standalone: false,
  templateUrl: './ui-header.component.html',
  styleUrl: './ui-header.component.scss',
})
export class UiHeaderComponent {
  labelService = inject(LabelService);
  labelKeys = LabelKey;
  _rightActionMenu!: NavItem[];

  @Input() set rightActionMenu(items: NavItem[]) {
    this._rightActionMenu = items;
  }

  @Output() clickEvent = new EventEmitter<{ index: number; path: NavItem }>();
  @Output() homeClickEvent = new EventEmitter<void>();

  onItemClick(index: number, item: NavItem) {
    this.clickEvent.emit({ index: index, path: item });
  }

  homeClick() {
    this.homeClickEvent.emit();
  }
}
