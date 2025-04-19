import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../event/services/event.service';
import { IBannerList, IEventDetail, IFacilityList, ILegalPageList, ITempleList, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { BannerService, LabelService } from '@core-lib';
import { TempleService } from '../temple/services/temple.service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { FacilityService } from '../facility/services/facility.service';

@Component({
  selector: 'vsd-web-app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  bannerService = inject(BannerService);
  banners: IBannerList[] = [];
  templeTitle = 'मंदिर';
  eventTitle = 'आगामी कार्यक्रम';
  aboutUsTitle = 'हमारे बारे में';
  trusteeTitle = 'हमारे ट्रस्टी';
  facilitiesTitle = 'सुविधाएँ';
  protected readonly LabelKey = LabelKey;

  upcomingEvents: IEventDetail[] = [];
  temples: ITempleList[] = [];
  facilities: IFacilityList[] = [];
  legalPage!: ILegalPageList;

  constructor(private eventService: EventService,
              private templeService: TempleService,
              private facilityService: FacilityService,
              protected labelService: LabelService,
              private commonService: CommonService,
              private route: Router) {
  }

  async ngOnInit() {
    this.banners = await this.bannerService.loadBanner(MediaForEnum.HOME);
    this.facilitiesTitle = this.labelService.getLabel(this.LabelKey.SIDE_MENU_FACILITY);
    this.aboutUsTitle = this.labelService.getLabel(this.LabelKey.SIDE_MENU_ABOUT_US);
    this.templeTitle = this.labelService.getLabel(this.LabelKey.SIDE_MENU_TEMPLE);
    await this.loadDetails();
  }

  async loadDetails() {
    const res = await Promise.all([
      await this.eventService.loadUpcomingEvents(),
      this.templeService.loadHomeTemples(),
      this.facilityService.loadHomeFacilities(),
      this.commonService.loadPage('about-us'),
    ]);
    this.upcomingEvents = res[0];
    this.temples = res[1];
    this.facilities = res[2];
    this.legalPage = res[3];
  }

  aboutUsClick() {
    this.route.navigate(['/about-us']);
  }
}
