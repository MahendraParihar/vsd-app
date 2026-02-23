import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface CardData {
  image: string;
  title: string;
  description: string;
  category?: string;
  readTime?: string;
}

@Component({
  selector: 'lib-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.scss'],
  standalone: false
})
export class FeatureCardComponent {
  @Input() data!: CardData;
  @Input() showCategory = true;
  
  @Output() share = new EventEmitter<CardData>();
  @Output() viewDetails = new EventEmitter<CardData>();

  onShare(event: Event): void {
    event.stopPropagation();
    this.share.emit(this.data);
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.data);
  }
}

