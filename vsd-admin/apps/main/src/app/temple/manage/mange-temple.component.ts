import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-mange-temple',
  standalone: false,
  templateUrl: './mange-temple.component.html',
  styleUrl: './mange-temple.component.scss',
})
export class MangeTempleComponent {
  @Input() id!: number;
}
