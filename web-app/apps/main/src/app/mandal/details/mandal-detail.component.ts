import { Component, Input } from '@angular/core';
import { MandalService } from '../services/mandal.service';
import { IMandalDetail, IMandalMemberInfo, LabelKey } from '@vsd-common/lib';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { LabelService } from '@core-lib';

@Component({
  selector: 'vsd-web-app-mandal-detail',
  standalone: false,
  templateUrl: './mandal-detail.component.html',
  styleUrl: './mandal-detail.component.scss',
})
export class MandalDetailComponent {
  mandal!: IMandalDetail;
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
    this.bindSEOData();
  }

  getDummyMemberEntry(post: IMandalMemberInfo) {
    const dummyEntry: null[] = [];
    if (post.members && post.members.length > 0) {
      let dummyCount = post.members.length % 3;
      if (post.members.length === 1) {
        dummyCount = 1 + dummyCount;
      }
      for (let i = 0; i < dummyCount; i++) {
        dummyEntry.push(null);
      }
    }
    return dummyEntry;
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
}
