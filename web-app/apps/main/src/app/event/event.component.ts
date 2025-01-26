import { Component, OnInit } from '@angular/core';
import { IEventList, ITableList, LabelKey } from '@vsd-common/lib';
import { EventService } from './services/event.service';
import { LabelService } from '@core-lib';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';

@Component({
  selector: 'vsd-web-app-event',
  standalone: false,
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
})
export class EventComponent implements OnInit {
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
