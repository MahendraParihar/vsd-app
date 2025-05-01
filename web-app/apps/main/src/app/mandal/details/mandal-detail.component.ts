import { Component, Input } from '@angular/core';
import { MandalService } from '../services/mandal.service';
import { IBannerList, IMandalDetail, IMemberPostInfo, LabelKey } from '@vsd-common/lib';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { insertDummyEntry, LabelService } from '@core-lib';

@Component({
  selector: 'vsd-web-app-mandal-detail',
  standalone: false,
  templateUrl: './mandal-detail.component.html',
  styleUrl: './mandal-detail.component.scss',
})
export class MandalDetailComponent {
  mandal!: IMandalDetail;
  banners: IBannerList[] = [];
  _url!: string;

  @Input()
  set url(url: string) {
    this._url = url;
    this.loadData();
  }

  constructor(private mandalService: MandalService,
              private metaService: Meta,
              private titleService: Title,
              private labelService: LabelService) {
  }

  async loadData() {
    this.mandal = await this.mandalService.loadMandalDetails(this._url);
    if (this.mandal.imagePath && this.mandal.imagePath.length > 0) {
      this.banners = this.mandal.imagePath.map((imagePath) => {
        return <IBannerList>{
          title: this.mandal.mandalName,
          imagePath: this.mandal.imagePath[0],
        }
      })
    }
    this.bindSEOData();
  }

  getDummyMemberEntry(post: IMemberPostInfo) {
    return insertDummyEntry(post.members, 4);
  }

  bindSEOData() {
    if (!this.mandal) {
      return;
    }
    this.titleService.setTitle(`${this.labelService.getLabel(LabelKey.SIDE_MENU_MANDAL)}: ${this.mandal.mandalName}`);
    const seoArray: MetaDefinition[] = [];
    if (this.mandal.tags) {
      seoArray.push({ name: 'keyword', content: this.mandal.tags.join(',') });
    }
    if (this.mandal.metaDescription) {
      seoArray.push({ name: 'description', content: this.mandal.metaDescription });
    }
    this.metaService.addTags(seoArray);
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }
}
