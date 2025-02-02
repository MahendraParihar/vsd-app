import { Component, Input } from '@angular/core';
import { ITempleList, LabelKey } from '@vsd-common/lib';
import { Router } from '@angular/router';
import { insertDummyEntry, LabelService } from '@core-lib';

@Component({
  selector: 'vsd-web-app-temple-card',
  standalone: false,
  templateUrl: './temple-card.component.html',
  styleUrl: './temple-card.component.scss',
})
export class TempleCardComponent {
  @Input() temples!: ITempleList[];
  labelKey = LabelKey;

  constructor(private router: Router,
              public labelService: LabelService) {
  }

  get dummyEntry() {
    return insertDummyEntry(this.temples);
  }

  getAddress(item: ITempleList) {
    return `${item.address.district}, ${item.address.state}`;
  }

  onClick(item: ITempleList) {
    this.router.navigate([`/temple/${item.url}`]);
  }
}
