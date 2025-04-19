import { Component, Input } from '@angular/core';
import { IMandalList, LabelKey } from '@vsd-common/lib';
import { Router } from '@angular/router';
import { getAddress, insertDummyEntry, LabelService } from '@core-lib';

@Component({
  selector: 'vsd-web-app-mandal-card',
  standalone: false,
  templateUrl: './mandal-card.component.html',
  styleUrl: './mandal-card.component.scss',
})
export class MandalCardComponent {
  @Input() mandals!: IMandalList[];
  labelKey = LabelKey;
  address = getAddress;

  constructor(private router: Router,
              public labelService: LabelService) {
  }

  get dummyEntry() {
    return insertDummyEntry(this.mandals);
  }

  onClick(item: IMandalList) {
    this.router.navigate([`/mandal/${item.url}`]);
  }
}
