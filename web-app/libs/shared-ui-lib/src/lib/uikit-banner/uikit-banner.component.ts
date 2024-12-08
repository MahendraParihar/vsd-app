import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-ui-lib-uikit-banner',
  templateUrl: './uikit-banner.component.html',
  standalone: false,
  styleUrl: './uikit-banner.component.scss',
})
export class UikitBannerComponent {
  @Input() banner!: string[];
}
