import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-mange-news',
  standalone: false,
  templateUrl: './mange-news.component.html',
  styleUrl: './mange-news.component.scss',
})
export class MangeNewsComponent {
  @Input() id!: number;
}
