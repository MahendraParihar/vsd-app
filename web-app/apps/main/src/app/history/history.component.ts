import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { ILegalPage, ILegalPageList, LabelKey } from '@vsd-common/lib';
import { LabelService } from '@core-lib';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'vsd-web-app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
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
