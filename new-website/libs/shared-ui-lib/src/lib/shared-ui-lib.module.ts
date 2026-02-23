import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { FeatureCardComponent } from './components/feature-card/feature-card.component';
import { BannerSliderComponent } from './components/banner-slider/banner-slider.component';
import { FaqComponent } from './components/faq/faq.component';

@NgModule({
  declarations: [
    FeatureCardComponent,
    BannerSliderComponent,
    FaqComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTooltipModule,
    MatExpansionModule,
  ],
  exports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTooltipModule,
    MatExpansionModule,
    FeatureCardComponent,
    BannerSliderComponent,
    FaqComponent,
  ],
})
export class SharedUiLibModule {}

