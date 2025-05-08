import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-ui-lib-uikit-label',
  templateUrl: './uikit-label.component.html',
  standalone: false,
  styleUrl: './uikit-label.component.scss',
})
export class UikitLabelComponent {
  @Input() label!: string | null;
  @Input() class: string[] = ['mat-body-2'];
  @Input() charLimit!: number;
  @Input() tooltip!: string;
  @Input() hasHtmlContent: boolean = false;

  generateClass() {
    if (!this.class || this.class.length === 0) {
      return '';
    } else {
      return this.class.join(' ');
    }
  }
}
