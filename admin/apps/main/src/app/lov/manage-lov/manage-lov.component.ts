import { Component, Input } from '@angular/core';

@Component({
  selector: 'vsd-admin-manage-lov',
  standalone: false,
  templateUrl: './manage-lov.component.html',
  styleUrl: './manage-lov.component.scss',
})
export class ManageLovComponent {
  _type: string | null = 'job-category';

  @Input()
  set type(typeUrl: string) {
    this._type = typeUrl;
  }
}
