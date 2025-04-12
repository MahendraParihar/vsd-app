import { Component, Input } from '@angular/core';

@Component({
  selector: 'main-mange-banner',
  standalone: false,
  templateUrl: './mange-banner.component.html',
  styleUrl: './mange-banner.component.scss',
})
export class MangeBannerComponent {
  @Input() id!: number;
}
