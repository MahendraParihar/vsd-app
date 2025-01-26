import { Component, OnInit } from '@angular/core';
import { EventService } from '../event/services/event.service';
import { IEventDetail, ITempleList, LabelKey } from '@vsd-common/lib';
import { LabelService } from '@core-lib';
import { TempleService } from '../temple/services/temple.service';

@Component({
  selector: 'vsd-web-app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  templeTitle = 'मंदिर';
  eventTitle = 'आगामी कार्यक्रम';
  aboutUsTitle = 'हमारे बारे में';
  trusteeTitle = 'हमारे ट्रस्टी';
  facilitiesTitle = 'सुविधाएँ';
  protected readonly LabelKey = LabelKey;

  upcomingEvents: IEventDetail[] = [];
  temples: ITempleList[] = [];

  constructor(private eventService: EventService,
              private templeService: TempleService,
              private labelService: LabelService) {
  }

  async ngOnInit() {
    this.facilitiesTitle = this.labelService.getLabel(this.LabelKey.SIDE_MENU_FACILITY);
    this.aboutUsTitle = this.labelService.getLabel(this.LabelKey.SIDE_MENU_ABOUT_US);
    this.templeTitle = this.labelService.getLabel(this.LabelKey.SIDE_MENU_TEMPLE);
    await this.loadDetails();
  }

  async loadDetails() {
    const res = await Promise.all([
      await this.eventService.loadUpcomingEvents(),
      this.templeService.loadHomeTemples(),
    ]);
    this.upcomingEvents = res[0];
    this.temples = res[1];
  }
}
