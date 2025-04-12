import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-mange-mandal',
  standalone: false,
  templateUrl: './mange-mandal.component.html',
  styleUrl: './mange-mandal.component.scss',
})
export class MangeMandalComponent {
  @Input() id!: number;
}
