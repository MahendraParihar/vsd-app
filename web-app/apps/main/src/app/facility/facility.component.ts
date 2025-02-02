import { Component, OnInit } from '@angular/core';
import { IFacilityList, ITableList, LabelKey } from '@vsd-common/lib';
import { FacilityService } from './services/facility.service';
import { insertDummyEntry, LabelService } from '@core-lib';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'vsd-web-app-facility',
  standalone: false,
  templateUrl: './facility.component.html',
  styleUrl: './facility.component.scss',
})
export class FacilityComponent implements OnInit {
  dataSet!: ITableList<IFacilityList>;
  pageTitle!: string | undefined;
  labelKey= LabelKey;

  constructor(private facilityService: FacilityService,
              public labelService: LabelService,
              private router: Router,
              private title: Title,
              private metaService: Meta) {
    this.pageTitle = this.labelService.labels.get(LabelKey.SIDE_MENU_FACILITY);
    if (this.pageTitle) {
      this.title.setTitle(this.pageTitle);
    }
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.dataSet = await this.facilityService.loadFacilities(0);
    this.bindSEOData();
  }

  get dummyEntry() {
    return insertDummyEntry(this.dataSet.data);
  }

  getAddress(item: IFacilityList) {
    return `${item.address.district}, ${item.address.state}`;
  }

  onClick(item: IFacilityList) {
    this.router.navigate([`/facility/${item.url}`]);
  }

  bindSEOData() {
    if (!this.dataSet) {
      return;
    }
    const seoArray: MetaDefinition[] = [];
    if (this.dataSet.tags) {
      seoArray.push({ name: 'keyword', content: this.dataSet.tags.join(',') });
    }
    if (this.dataSet.metaDescription) {
      seoArray.push({ name: 'description', content: this.dataSet.metaDescription });
    }
    this.metaService.addTags(seoArray);
  }
}
