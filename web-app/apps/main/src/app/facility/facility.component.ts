import { Component, inject, OnInit } from '@angular/core';
import { IBannerList, IFacilityList, ITableList, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { FacilityService } from './services/facility.service';
import { BannerService, insertDummyEntry, LabelService } from '@core-lib';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'vsd-web-app-facility',
  standalone: false,
  templateUrl: './facility.component.html',
  styleUrl: './facility.component.scss',
})
export class FacilityComponent implements OnInit {
  bannerService = inject(BannerService);
  banners: IBannerList[] = [];

  dataSet!: ITableList<IFacilityList>;
  pageTitle!: string | undefined;
  labelKey = LabelKey;

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
    this.banners = await this.bannerService.loadBanner(MediaForEnum.FACILITY);
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
