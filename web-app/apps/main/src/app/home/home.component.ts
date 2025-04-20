import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../event/services/event.service';
import {
  IBannerList,
  IEventDetail,
  IFacilityList,
  ILegalPageList,
  IMandalDetail,
  ITempleList,
  LabelKey,
  MediaForEnum,
} from '@vsd-common/lib';
import { BannerService, LabelService } from '@core-lib';
import { TempleService } from '../temple/services/temple.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { FacilityService } from '../facility/services/facility.service';
import { MandalService } from '../mandal/services/mandal.service';

@Component({
  selector: 'vsd-web-app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  bannerService = inject(BannerService);
  labelService = inject(LabelService);

  banners: IBannerList[] = [];
  templeTitle = this.labelService.getLabel(LabelKey.HOME_TEMPLE_TITLE);
  eventTitle = this.labelService.getLabel(LabelKey.HOME_EVENT_TITLE);
  aboutUsTitle = this.labelService.getLabel(LabelKey.HOME_ABOUT_US_TITLE);
  trusteeTitle = this.labelService.getLabel(LabelKey.HOME_TRUSTEE_TITLE);
  facilitiesTitle = this.labelService.getLabel(LabelKey.HOME_FACILITY_TITLE);
  protected readonly LabelKey = LabelKey;

  primaryMandal!: IMandalDetail;
  upcomingEvents: IEventDetail[] = [];
  temples: ITempleList[] = [];
  facilities: IFacilityList[] = [];
  legalPage!: ILegalPageList;

  constructor(private eventService: EventService,
              private templeService: TempleService,
              private facilityService: FacilityService,
              private commonService: CommonService,
              private mandalService: MandalService,
              private route: Router) {
  }

  async ngOnInit() {
    this.banners = await this.bannerService.loadBanner(MediaForEnum.HOME);
    await this.loadDetails();
  }

  async loadDetails() {
    const [events, temples, facilities, legalPage, primaryMandal] = await Promise.all([
      await this.eventService.loadUpcomingEvents(),
      this.templeService.loadHomeTemples(),
      this.facilityService.loadHomeFacilities(),
      this.commonService.loadPage('about-us'),
      this.mandalService.loadPrimaryMandalDetails(),
    ]);
    this.upcomingEvents = events;
    this.temples = temples;
    this.facilities = facilities;
    this.legalPage = legalPage;
    this.primaryMandal = primaryMandal;
  }

  aboutUsClick() {
    this.route.navigate(['/about-us']);
  }
}
