import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-ui-lib-uikit-banner',
  templateUrl: './uikit-banner.component.html',
  standalone: false,
  styleUrl: './uikit-banner.component.scss',
})
export class UikitBannerComponent {
  @Input() banner!: string[];
  @Input() title!: string;
  @Input() subTitle!: string;

  slideIndex: number = 0;

  nextSlide() {
    if (this.slideIndex < this.banner.length - 1) {
      this.slideIndex++;
    }
  }

  previousSlide() {
    if (this.slideIndex > 0) {
      this.slideIndex--;
    }
  }
}
