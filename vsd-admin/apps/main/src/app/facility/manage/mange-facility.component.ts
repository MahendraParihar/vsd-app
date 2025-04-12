import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-mange-facility',
  standalone: false,
  templateUrl: './mange-facility.component.html',
  styleUrl: './mange-facility.component.scss',
})
export class MangeFacilityComponent {
  @Input() id!: number;
}
