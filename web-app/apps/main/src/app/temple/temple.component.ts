import { Component, OnInit } from '@angular/core';
import { TempleService } from './services/temple.service';
import { ITableList, ITempleList, LabelKey } from '@vsd-common/lib';
import { LabelService } from '@core-lib';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'vsd-web-app-temple',
  standalone: false,
  templateUrl: './temple.component.html',
  styleUrl: './temple.component.scss',
})
export class TempleComponent implements OnInit {
  dataSet!: ITableList<ITempleList>;
  pageTitle!: string | undefined;

  constructor(private templeService: TempleService,
              private labelService: LabelService,
              private titleService: Title,
              private metaService: Meta) {
    this.pageTitle = this.labelService.labels.get(LabelKey.SIDE_MENU_TEMPLE);
    if (this.pageTitle) {
      this.titleService.setTitle(this.pageTitle);
    }
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.dataSet = await this.templeService.loadTemples(0);
    this.bindSEOData();
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
