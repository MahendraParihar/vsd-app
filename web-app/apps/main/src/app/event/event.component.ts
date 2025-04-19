import { Component, inject, OnInit } from '@angular/core';
import { IBannerList, IEventList, ITableList, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { EventService } from './services/event.service';
import { BannerService, LabelService } from '@core-lib';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'vsd-web-app-event',
  standalone: false,
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent implements OnInit {
  bannerService = inject(BannerService);
  banners: IBannerList[] = [];

  dataSet!: ITableList<IEventList>;
  pageTitle!: string | undefined;

  constructor(private eventService: EventService,
              private labelService: LabelService,
              private title: Title,
              private metaService: Meta) {
    this.pageTitle = this.labelService.labels.get(LabelKey.SIDE_MENU_EVENT);
    if (this.pageTitle) {
      this.title.setTitle(this.pageTitle);
    }
  }

  async ngOnInit() {
    this.banners = await this.bannerService.loadBanner(MediaForEnum.EVENT);
    await this.loadData();
  }

  async loadData() {
    this.dataSet = await this.eventService.loadEvents(0);
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
