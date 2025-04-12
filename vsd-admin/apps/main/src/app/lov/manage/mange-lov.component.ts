import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-mange-lov',
  standalone: false,
  templateUrl: './mange-lov.component.html',
  styleUrl: './mange-lov.component.scss',
})
export class MangeLovComponent {
  _type: string | null = 'job-category';

  @Input() id!: number;

  @Input()
  set type(typeUrl: string) {
    this._type = typeUrl;
  }
}
