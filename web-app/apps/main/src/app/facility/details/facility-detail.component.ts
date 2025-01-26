import { Component, Input } from '@angular/core';
import { FacilityService } from '../services/facility.service';
import { IFacilityList, IMandalDetail, LabelKey } from '@vsd-common/lib';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { LabelService } from '@core-lib';

@Component({
  selector: 'vsd-web-app-facility-detail',
  standalone: false,
  templateUrl: './facility-detail.component.html',
  styleUrl: './facility-detail.component.scss',
})
export class FacilityDetailComponent {
  facility!: IFacilityList;
  _url!: string;

  @Input()
  set url(url: string) {
    this._url = url;
    this.loadData();
  }

  constructor(private facilityService: FacilityService,
              private labelService: LabelService,
              private metaService: Meta,
              private titleService: Title) {
  }

  async loadData() {
    this.facility = await this.facilityService.loadFacilityDetails(this._url);
  }

  bindSEOData() {
    if (!this.facility) {
      return;
    }
    this.titleService.setTitle(`${this.labelService.getLabel(LabelKey.SIDE_MENU_FACILITY)}: ${this.facility.title}`);
    const seoArray: MetaDefinition[] = [];
    if (this.facility.tags) {
      seoArray.push({ name: 'keyword', content: this.facility.tags.join(',') });
    }
    if (this.facility.metaDescription) {
      seoArray.push({ name: 'description', content: this.facility.metaDescription });
    }
    this.metaService.addTags(seoArray);
  }
}
