import { Component, inject, OnInit } from '@angular/core';
import { IBannerList, IMandalList, ITableList, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { MandalService } from './services/mandal.service';
import { BannerService, LabelService } from '@core-lib';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'vsd-web-app-mandal',
  standalone: false,
  templateUrl: './mandal.component.html',
  styleUrl: './mandal.component.scss',
})
export class MandalComponent implements OnInit {
  bannerService = inject(BannerService);
  banners: IBannerList[] = [];

  dataSet!: ITableList<IMandalList>;
  pageTitle!: string | undefined;

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
    this.banners = await this.bannerService.loadBanner(MediaForEnum.MANDAL);
    await this.loadData();
  }

  async loadData() {
    this.dataSet = await this.mandalService.loadMandals(0);
    this.bindSEOData();
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
