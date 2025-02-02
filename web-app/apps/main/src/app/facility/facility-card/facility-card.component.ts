import { Component, Input } from '@angular/core';
import { IFacilityList, LabelKey } from '@vsd-common/lib';
import { Router } from '@angular/router';
import { insertDummyEntry, LabelService } from '@core-lib';

@Component({
  selector: 'vsd-web-app-facility-card',
  standalone: false,
  templateUrl: './facility-card.component.html',
  styleUrl: './facility-card.component.scss',
})
export class FacilityCardComponent {
  @Input() facilities!: IFacilityList[];
  labelKey = LabelKey;

  constructor(private router: Router,
              public labelService: LabelService) {
  }

  get dummyEntry() {
    return insertDummyEntry(this.facilities);
  }

  getAddress(item: IFacilityList) {
    return `${item.address.district}, ${item.address.state}`;
  }

  onClick(item: IFacilityList) {
    this.router.navigate([`/facility/${item.url}`]);
  }
}
