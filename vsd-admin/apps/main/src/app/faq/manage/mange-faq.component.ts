import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-mange-faq',
  standalone: false,
  templateUrl: './mange-faq.component.html',
  styleUrl: './mange-faq.component.scss',
})
export class MangeFaqComponent {
  @Input() id!: number;
}
