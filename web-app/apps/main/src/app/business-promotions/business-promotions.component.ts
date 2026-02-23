import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { VsdCardComponent } from '@vsd-web-app/shared-ui-lib';
import { BusinessPromotionService } from '@vsd-web-app/core-lib';
import { ResponsiveService } from '@vsd-web-app/core-lib';
import { IBusinessPromotionResponseDto } from 'shared-library';

@Component({
  selector: 'vsd-business-promotions',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    VsdCardComponent
  ],
  templateUrl: './business-promotions.component.html',
  styleUrls: ['./business-promotions.component.scss']
})
export class BusinessPromotionsComponent implements OnInit {
  promotions: IBusinessPromotionResponseDto[] = [];
  filteredPromotions: IBusinessPromotionResponseDto[] = [];
  loading = false;
  searchText = '';
  selectedCategory = 'all';
  
  categories = [
    { value: 'all', label: 'सभी श्रेणियां' },
    { value: 'retail', label: 'खुदरा' },
    { value: 'services', label: 'सेवाएं' },
    { value: 'manufacturing', label: 'निर्माण' },
    { value: 'education', label: 'शिक्षा' },
    { value: 'healthcare', label: 'स्वास्थ्य' },
    { value: 'food', label: 'भोजन' },
    { value: 'other', label: 'अन्य' }
  ];

  constructor(
    private businessPromotionService: BusinessPromotionService,
    private router: Router,
    public responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.loadPromotions();
  }

  loadPromotions(): void {
    this.loading = true;
    this.businessPromotionService.getBusinessPromotions().subscribe({
      next: (response) => {
        this.promotions = response.data || [];
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading business promotions:', error);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredPromotions = this.promotions.filter(promo => {
      const matchesSearch = !this.searchText || 
        promo.businessName?.toLowerCase().includes(this.searchText.toLowerCase()) ||
        promo.shortDescription?.toLowerCase().includes(this.searchText.toLowerCase());
      
      const matchesCategory = this.selectedCategory === 'all' || 
        promo.category === this.selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.applyFilters();
  }

  viewDetails(id: number): void {
    this.router.navigate(['/business-promotions', id]);
  }

  getGridCols(): number {
    if (this.responsiveService.isSmallScreen()) return 1;
    if (this.responsiveService.isMediumScreen()) return 2;
    return 3;
  }

  getImageUrl(imagePath?: string): string {
    return imagePath || 'assets/images/default-business.jpg';
  }
}

