import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-mange-job',
  standalone: false,
  templateUrl: './mange-job.component.html',
  styleUrl: './mange-job.component.scss',
})
export class MangeJobComponent {
  @Input() id!: number;
}
