import { Component, OnInit } from '@angular/core';
import { ILegalPage, ILegalPageList, LabelKey } from '@vsd-common/lib';
import { CommonService } from '../common.service';
import { LabelService } from '@core-lib';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'vsd-web-app-about-us',
  standalone: false,
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent implements OnInit {
  legalPage!: ILegalPageList;
  pageTitle!: string | undefined;

  constructor(private commonService: CommonService,
              private labelService: LabelService,
              private title: Title,
              private metaService: Meta) {
    this.pageTitle = this.labelService.labels.get(LabelKey.SIDE_MENU_ABOUT_US);
    if (this.pageTitle) {
      this.title.setTitle(this.pageTitle);
    }
  }

  async ngOnInit() {
    await this.loadPage();
  }

  async loadPage() {
    this.legalPage = await this.commonService.loadPage('about-us');
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
