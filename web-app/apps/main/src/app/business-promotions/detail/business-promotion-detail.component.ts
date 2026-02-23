import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { BusinessPromotionService } from '@vsd-web-app/core-lib';
import { ResponsiveService } from '@vsd-web-app/core-lib';
import { IBusinessPromotionResponseDto } from 'shared-library';

@Component({
  selector: 'vsd-business-promotion-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule
  ],
  templateUrl: './business-promotion-detail.component.html',
  styleUrls: ['./business-promotion-detail.component.scss']
})
export class BusinessPromotionDetailComponent implements OnInit {
  promotion: IBusinessPromotionResponseDto | null = null;
  loading = false;
  productImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private businessPromotionService: BusinessPromotionService,
    public responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPromotionDetail(+id);
    }
  }

  loadPromotionDetail(id: number): void {
    this.loading = true;
    this.businessPromotionService.getBusinessPromotionById(id).subscribe({
      next: (response) => {
        this.promotion = response.data;
        this.loadProductImages();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading business promotion:', error);
        this.loading = false;
        this.router.navigate(['/business-promotions']);
      }
    });
  }

  loadProductImages(): void {
    // Mock product images (replace with actual API call)
    // In real implementation, this would come from promotion.productImages
    this.productImages = Array.from({ length: 12 }, (_, i) => 
      `assets/images/products/product-${i + 1}.jpg`
    );
  }

  goBack(): void {
    this.router.navigate(['/business-promotions']);
  }

  callBusiness(): void {
    if (this.promotion?.mobile) {
      window.location.href = `tel:${this.promotion.mobile}`;
    }
  }

  openDirections(): void {
    if (this.promotion?.address) {
      const query = encodeURIComponent(this.promotion.address);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    }
  }

  sharePromotion(): void {
    if (navigator.share) {
      navigator.share({
        title: this.promotion?.businessName || '',
        text: this.promotion?.shortDescription || '',
        url: window.location.href
      });
    }
  }

  getImageUrl(imagePath?: string): string {
    return imagePath || 'assets/images/default-business.jpg';
  }

  getGridCols(): number {
    if (this.responsiveService.isSmallScreen()) return 2;
    if (this.responsiveService.isMediumScreen()) return 3;
    return 4;
  }
}

