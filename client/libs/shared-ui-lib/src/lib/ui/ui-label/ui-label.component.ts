import { Component, Input } from '@angular/core';

@Component({
  selector: 'vsd-ui-label',
  templateUrl: './ui-label.component.html',
  styleUrl: './ui-label.component.scss',
})
export class LabelComponent {
  @Input() class: 'body' | 'title' = 'body';
  @Input() label!: string;
  @Input() toolTip!: string;
}
