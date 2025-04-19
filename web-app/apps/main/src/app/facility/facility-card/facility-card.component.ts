import { Component, inject, Input } from '@angular/core';
import { IBannerList, IFacilityList, LabelKey } from '@vsd-common/lib';
import { Router } from '@angular/router';
import { BannerService, getAddress, insertDummyEntry, LabelService } from '@core-lib';

@Component({
  selector: 'vsd-web-app-facility-card',
  standalone: false,
  templateUrl: './facility-card.component.html',
  styleUrl: './facility-card.component.scss',
})
export class FacilityCardComponent {
  banners: IBannerList[] = [];
  address = getAddress;

  @Input() facilities!: IFacilityList[];
  labelKey = LabelKey;

  constructor(private router: Router,
              public labelService: LabelService) {
  }

  get dummyEntry() {
    return insertDummyEntry(this.facilities);
  }

  onClick(item: IFacilityList) {
    this.router.navigate([`/facility/${item.url}`]);
  }
}
