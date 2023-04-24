import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {EventModel} from "../../../models/event.model";
import {ResponseDataModel} from "../../../models/response-data.model";
import {ApiUrlEnum} from "../../../enum/api-url-enum";
import {ServerResponseEnum} from "../../../enum/server-response-enum";
import {StringResources} from "../../../enum/string-resources";
import {HttpService} from "../../../service/http.service";
import {SnackBarService} from "../../../service/snack-bar.service";
import {NavigationService} from "../../../service/navigation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, AfterViewInit, OnDestroy {

  eventObj: EventModel;
  id: number;
  stringRes = StringResources;

  constructor(private httpService: HttpService,
              private snackBarService: SnackBarService,
              private navigationService: NavigationService,
              private activatedRoute: ActivatedRoute) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  async ngOnInit(): Promise<void> {
    await this.loadDetail();
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {

  }

  async loadDetail(): Promise<void> {
    const payload = {
      id: this.id
    };
    const res: ResponseDataModel = await this.httpService.getRequest(ApiUrlEnum.EVENT, payload, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.eventObj = EventModel.fromJson(res.data);
          break;
        case ServerResponseEnum.WARNING:
          this.snackBarService.showWarning(res.message);
          break;
        case ServerResponseEnum.ERROR:
          this.snackBarService.showError(res.message);
          break;
      }
    }
  }

}
