import { Component, OnInit } from '@angular/core';
import { TempleService } from '../temple/services/temple.service';
import { IEventList, ITableList, LabelKey } from '@vsd-common/lib';
import { EventService } from './services/event.service';
import { LabelService } from '@core-lib';
import { Title } from '@angular/platform-browser';

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
              private title: Title) {
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
  }
}
