import { Component, Input } from '@angular/core';

@Component({
  selector: 'vsd-admin-lov',
  standalone: false,
  templateUrl: './lov.component.html',
  styleUrl: './lov.component.scss',
})
export class LovComponent {
  _type: string | null = 'job-category';

  @Input()
  set type(typeUrl: string) {
    this._type = typeUrl;
  }
}
