import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-mange-matrimonial',
  standalone: false,
  templateUrl: './mange-matrimonial.component.html',
  styleUrl: './mange-matrimonial.component.scss',
})
export class MangeMatrimonialComponent {
  @Input() id!: number;
}
