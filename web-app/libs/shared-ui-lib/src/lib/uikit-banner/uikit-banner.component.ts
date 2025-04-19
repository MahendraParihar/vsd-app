import { Component, computed, Input } from '@angular/core';
import { ResponsiveService } from '@core-lib';
import { IBannerList } from '@vsd-common/lib';

@Component({
  selector: 'shared-ui-lib-uikit-banner',
  templateUrl: './uikit-banner.component.html',
  standalone: false,
  styleUrl: './uikit-banner.component.scss',
})
export class UikitBannerComponent {
  @Input() banner!: IBannerList[];
  @Input() title!: string;
  @Input() subTitle!: string;

  height = 500;

  bannerHeight = computed(() => {
    if (this.responsiveService.isXSmall()) {
      return 250;
    }
    if (this.responsiveService.isSmall()) {
      return 250;
    }
    if (this.responsiveService.isTablet()) {
      return 300;
    }
    if (this.responsiveService.isMedium()) {
      return 300;
    }
    if (this.responsiveService.isLarge()) {
      return 450;
    }
    if (this.responsiveService.isXLarge()) {
      return 500;
    }
    return 500;
  });

  slideIndex: number = 0;

  constructor(private responsiveService: ResponsiveService) {
  }

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
