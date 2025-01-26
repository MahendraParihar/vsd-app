import { Component, Input } from '@angular/core';
import { ITempleList, LabelKey } from '@vsd-common/lib';
import { TempleService } from '../services/temple.service';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { LabelService } from '@core-lib';

@Component({
  selector: 'vsd-web-app-temple-detail',
  standalone: false,
  templateUrl: './temple-detail.component.html',
  styleUrl: './temple-detail.component.scss',
})
export class TempleDetailComponent {
  temple!: ITempleList;
  _url!: string;

  @Input()
  set url(url: string) {
    this._url = url;
    this.loadData();
  }

  constructor(private templeService: TempleService,
              private metaService: Meta,
              private titleService: Title,
              private labelService: LabelService) {
  }

  async loadData() {
    this.temple = await this.templeService.loadTempleDetails(this._url);
    this.bindSEOData();
  }

  bindSEOData() {
    if (!this.temple) {
      return;
    }
    this.titleService.setTitle(`${this.labelService.getLabel(LabelKey.SIDE_MENU_TEMPLE)}: ${this.temple.templeName}`);
    const seoArray: MetaDefinition[] = [];
    if (this.temple.tags) {
      seoArray.push({ name: 'keyword', content: this.temple.tags.join(',') });
    }
    if (this.temple.metaDescription) {
      seoArray.push({ name: 'description', content: this.temple.metaDescription });
    }
    this.metaService.addTags(seoArray);
  }
}
