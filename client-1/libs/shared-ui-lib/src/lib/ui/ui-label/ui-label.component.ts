import { Component, Input } from '@angular/core';

@Component({
  selector: 'vsd-ui-label',
  standalone: false,
  templateUrl: './ui-label.component.html',
  styleUrl: './ui-label.component.scss',
})
export class LabelComponent {
  @Input() class: 'body' | 'title' | 'sub-title' = 'body';
  @Input() label!: string | undefined;
  @Input() toolTip!: string;
}
