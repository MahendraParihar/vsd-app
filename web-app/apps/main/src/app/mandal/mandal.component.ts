import { Component, OnInit } from '@angular/core';
import { IMandalList, ITableList, LabelKey } from '@vsd-common/lib';
import { MandalService } from './services/mandal.service';
import { insertDummyEntry, LabelService } from '@core-lib';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'vsd-web-app-mandal',
  standalone: false,
  templateUrl: './mandal.component.html',
  styleUrl: './mandal.component.scss',
})
export class MandalComponent implements OnInit {
  dataSet!: ITableList<IMandalList>;
  pageTitle!: string | undefined;
  labelKey = LabelKey;

  constructor(private mandalService: MandalService,
              public labelService: LabelService,
              private router: Router,
              private title: Title,
              private metaService: Meta) {
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
    this.bindSEOData();
  }

  get dummyEntry() {
    if (this.dataSet.data && this.dataSet.data.length > 0) {
      return insertDummyEntry(this.dataSet.data);
    }
    return [];
  }

  getAddress(item: IMandalList) {
    return `${item.address.district}, ${item.address.state}`;
  }

  onClick(item: IMandalList) {
    this.router.navigate([`/mandal/${item.url}`]);
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
