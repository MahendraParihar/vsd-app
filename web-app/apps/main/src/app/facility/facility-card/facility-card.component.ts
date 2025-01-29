import { Component, Input } from '@angular/core';
import { IFacilityList, LabelKey } from '@vsd-common/lib';
import { Router } from '@angular/router';
import { LabelService } from '@core-lib';

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
    const dummyEntry: null[] = [];
    if (this.facilities && this.facilities.length > 0) {
      console.log(this.facilities.length % 4);
      for (let i = 0; i < this.facilities.length % 4; i++) {}
      dummyEntry.push(null);
    }
    return dummyEntry;
  }

  getAddress(item: IFacilityList) {
    return `${item.address.district}, ${item.address.state}`;
  }

  onClick(item: IFacilityList) {
    this.router.navigate([`/facility/${item.url}`]);
  }
}
