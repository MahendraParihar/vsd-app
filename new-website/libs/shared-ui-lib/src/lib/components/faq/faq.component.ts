import { Component, Input } from '@angular/core';

export interface FaqItem {
  question: string;
  answer: string;
  questionHindi?: string;
  answerHindi?: string;
  category?: string;
}

@Component({
  selector: 'lib-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  standalone: false
})
export class FaqComponent {
  @Input() faqs: FaqItem[] = [];
  @Input() showCategory = false;
  @Input() multiExpand = false;
  @Input() bilingual = false;
  
  panelOpenState: { [key: number]: boolean } = {};

  togglePanel(index: number): void {
    if (!this.multiExpand) {
      // Close all other panels
      Object.keys(this.panelOpenState).forEach(key => {
        if (+key !== index) {
          this.panelOpenState[+key] = false;
        }
      });
    }
    this.panelOpenState[index] = !this.panelOpenState[index];
  }

  isPanelOpen(index: number): boolean {
    return this.panelOpenState[index] || false;
  }
}

