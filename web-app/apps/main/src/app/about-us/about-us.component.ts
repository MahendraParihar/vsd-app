import { Component, OnInit } from '@angular/core';
import { ILegalPage, LabelKey } from '@vsd-common/lib';
import { CommonService } from '../common.service';
import { LabelService } from '@core-lib';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'vsd-web-app-about-us',
  standalone: false,
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent implements OnInit {
  legalPage!: ILegalPage;
  pageTitle!:string | undefined;

  constructor(private commonService: CommonService,
              private labelService: LabelService,
              private title: Title) {
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
  }
}
