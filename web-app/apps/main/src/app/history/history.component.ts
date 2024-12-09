import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { ILegalPage, LabelKey } from '@vsd-common/lib';
import { LabelService } from '@core-lib';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'vsd-web-app-history',
  standalone: false,
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  legalPage!: ILegalPage;
  pageTitle!:string | undefined;

  constructor(private commonService: CommonService,
              private labelService: LabelService,
              private title: Title) {
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
  }
}
