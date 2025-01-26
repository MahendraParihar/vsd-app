import { Component, Input } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { LabelService } from '@core-lib';
import { IEventList, LabelKey } from '@vsd-common/lib';
import { EventService } from '../services/event.service';

@Component({
  selector: 'vsd-web-app-event-detail',
  standalone: false,
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})
export class EventDetailComponent {
  event!: IEventList;
  _url!: string;

  @Input()
  set url(url: string) {
    this._url = url;
    this.loadData();
  }

  constructor(
    private eventService: EventService,
    private metaService: Meta,
    private titleService: Title,
    private labelService: LabelService) {
  }

  async loadData() {
    this.event = await this.eventService.loadEventDetails(this._url);
    this.bindSEOData();
  }

  bindSEOData() {
    if (!this.event) {
      return;
    }
    this.titleService.setTitle(`${this.labelService.getLabel(LabelKey.SIDE_MENU_EVENT)}: ${this.event.title}`);
    const seoArray: MetaDefinition[] = [];
    if (this.event.tags) {
      seoArray.push({ name: 'keyword', content: this.event.tags.join(',') });
    }
    if (this.event.metaDescription) {
      seoArray.push({ name: 'description', content: this.event.metaDescription });
    }
    this.metaService.addTags(seoArray);
  }

}
