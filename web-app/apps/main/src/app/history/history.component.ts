import { Component, inject, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { IBannerList, ILegalPage, ILegalPageList, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { BannerService, LabelService } from '@core-lib';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'vsd-web-app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  bannerService = inject(BannerService);
  banners: IBannerList[] = [];

  legalPage!: ILegalPageList;
  pageTitle!:string | undefined;

  constructor(private commonService: CommonService,
              private labelService: LabelService,
              private title: Title,
              private metaService: Meta) {
    this.pageTitle = this.labelService.labels.get(LabelKey.SIDE_MENU_HISTORY);
    if (this.pageTitle) {
      this.title.setTitle(this.pageTitle);
    }
  }

  async ngOnInit() {
    this.banners = await this.bannerService.loadBanner(MediaForEnum.HISTORY);
    await this.loadPage();
  }

  async loadPage() {
    this.legalPage = await this.commonService.loadPage('history');
    this.bindSEOData();
  }

  bindSEOData() {
    if (!this.legalPage) {
      return;
    }
    const seoArray: MetaDefinition[] = [];
    if (this.legalPage.tags) {
      seoArray.push({ name: 'keyword', content: this.legalPage.tags.join(',') });
    }
    if (this.legalPage.metaDescription) {
      seoArray.push({ name: 'description', content: this.legalPage.metaDescription });
    }
    this.metaService.addTags(seoArray);
  }
}
