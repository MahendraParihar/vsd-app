import { Component, Input, OnInit, OnDestroy } from '@angular/core';

export interface BannerSlide {
  image: string;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  overlayDark?: boolean;
}

@Component({
  selector: 'lib-banner-slider',
  templateUrl: './banner-slider.component.html',
  styleUrls: ['./banner-slider.component.scss'],
  standalone: false
})
export class BannerSliderComponent implements OnInit, OnDestroy {
  @Input() slides: BannerSlide[] = [];
  @Input() autoPlay = true;
  @Input() interval = 5000; // 5 seconds
  @Input() height = '500px';
  @Input() showIndicators = true;
  @Input() showNavigation = true;

  currentIndex = 0;
  private autoPlayInterval: any;

  ngOnInit(): void {
    if (this.autoPlay && this.slides.length > 1) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  next(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.resetAutoPlay();
  }

  previous(): void {
    this.currentIndex = this.currentIndex === 0 
      ? this.slides.length - 1 
      : this.currentIndex - 1;
    this.resetAutoPlay();
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
    this.resetAutoPlay();
  }

  private startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, this.interval);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  private resetAutoPlay(): void {
    if (this.autoPlay) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }

  onButtonClick(slide: BannerSlide): void {
    if (slide.buttonLink) {
      // Navigate to link
      console.log('Navigate to:', slide.buttonLink);
    }
  }
}

