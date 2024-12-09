import { Component, OnInit } from '@angular/core';
import { IMandalList, ITableList, LabelKey } from '@vsd-common/lib';
import { MandalService } from './services/mandal.service';
import { LabelService } from '@core-lib';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'vsd-web-app-mandal',
  standalone: false,
  templateUrl: './mandal.component.html',
  styleUrl: './mandal.component.scss',
})
export class MandalComponent implements OnInit {
  dataSet!: ITableList<IMandalList>;
  pageTitle!: string | undefined;

  constructor(private mandalService: MandalService,
              private labelService: LabelService,
              private title: Title) {
    this.pageTitle = this.labelService.labels.get(LabelKey.SIDE_MENU_MANDAL);
    if (this.pageTitle) {
      this.title.setTitle(this.pageTitle);
    }
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.dataSet = await this.mandalService.loadMandals(0);
  }
}
