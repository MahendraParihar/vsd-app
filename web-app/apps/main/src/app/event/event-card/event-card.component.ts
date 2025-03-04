import { Component, Input } from '@angular/core';
import { IEventList, LabelKey } from '@vsd-common/lib';
import { LabelService } from '@core-lib';
import { Router } from '@angular/router';

@Component({
  selector: 'vsd-web-app-event-card',
  standalone: false,
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  @Input() events!: IEventList[];
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
  protected readonly LabelKey = LabelKey;
  activeEventIndex = 0;

  constructor(public labelService: LabelService,
              private router: Router) {
  }

  address(item: IEventList) {
    if (!item || !item.address) {
      return '';
    }
    return `${item.address.district} ${item.address.state}`;
  }

  onClick(item: IEventList) {
    this.router.navigate([`/event/${item.url}`]);
  }
}
