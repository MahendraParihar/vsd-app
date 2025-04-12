import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreadcrumbItem } from '@vsd-frontend/core-lib';

@Component({
  selector: 'shared-ui-lib-ui-breadcrumb',
  standalone: false,
  templateUrl: './ui-breadcrumb.component.html',
  styleUrl: './ui-breadcrumb.component.scss',
})
export class UiBreadcrumbComponent {
  _breadcrumbList: BreadcrumbItem[] = [];

  @Input() set breadcrumbList(item: BreadcrumbItem[]) {
    this._breadcrumbList = item;
  }

  @Output() path = new EventEmitter<BreadcrumbItem>();

  onItemClicked(item: BreadcrumbItem) {
    this.path.emit(item);
  }
}
