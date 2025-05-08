import { Component, Input } from '@angular/core';
import { FacilityService } from '../services/facility.service';
import { IBannerList, IFacilityDetail, IMemberPostInfo, LabelKey } from '@vsd-common/lib';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { insertDummyEntry, LabelService } from '@core-lib';

@Component({
  selector: 'vsd-web-app-facility-detail',
  standalone: false,
  templateUrl: './facility-detail.component.html',
  styleUrl: './facility-detail.component.scss',
})
export class FacilityDetailComponent {
  facility!: IFacilityDetail;
  banners: IBannerList[] = [];
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
    if (this.facility.imagePath && this.facility.imagePath.length > 0) {
      this.banners = this.facility.imagePath.map((imagePath) => {
        return <IBannerList>{
          title: this.facility.title,
          imagePath: this.facility.imagePath[0],
        }
      })
    }
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

  getDummyMemberEntry(post: IMemberPostInfo) {
    if (post.members && post.members.length > 0) {
      return insertDummyEntry(post.members, 4);
    }
    return [];
  }
}
