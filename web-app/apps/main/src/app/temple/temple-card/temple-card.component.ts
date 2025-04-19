import { Component, Input } from '@angular/core';
import { ITempleList, LabelKey } from '@vsd-common/lib';
import { Router } from '@angular/router';
import { getAddress, insertDummyEntry, LabelService } from '@core-lib';

@Component({
  selector: 'vsd-web-app-temple-card',
  standalone: false,
  templateUrl: './temple-card.component.html',
  styleUrl: './temple-card.component.scss',
})
export class TempleCardComponent {
  address = getAddress;
  @Input() temples!: ITempleList[];
  labelKey = LabelKey;

  constructor(private router: Router,
              public labelService: LabelService) {
  }

  get dummyEntry() {
    return insertDummyEntry(this.temples);
  }

  onClick(item: ITempleList) {
    this.router.navigate([`/temple/${item.url}`]);
  }
}
