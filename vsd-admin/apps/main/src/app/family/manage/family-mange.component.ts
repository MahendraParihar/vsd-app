import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-mange-family',
  standalone: false,
  templateUrl: './family-mange.component.html',
  styleUrl: './family-mange.component.scss',
})
export class FamilyMangeComponent {
  @Input() id!: number;
}
