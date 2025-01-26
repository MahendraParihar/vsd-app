import { Component, Input } from '@angular/core';
import { IEventList } from '@vsd-common/lib';

@Component({
  selector: 'vsd-web-app-event-card',
  standalone: false,
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent {
  @Input() events!: IEventList[];
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';

  address(item: IEventList) {
    if (!item || !item.address) {
      return '';
    }
    return `${item.address.district} ${item.address.state}`;
  }
}
