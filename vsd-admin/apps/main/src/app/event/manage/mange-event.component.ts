import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-mange-event',
  standalone: false,
  templateUrl: './mange-event.component.html',
  styleUrl: './mange-event.component.scss',
})
export class MangeEventComponent {
  @Input() id!: number;
}
