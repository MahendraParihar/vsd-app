import {AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {HttpService} from "../../../service/http.service";
import {SnackBarService} from "../../../service/snack-bar.service";
import {NavigationService} from "../../../service/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {ResponseDataModel} from "../../../models/response-data.model";
import {ApiUrlEnum} from "../../../enum/api-url-enum";
import {ServerResponseEnum} from "../../../enum/server-response-enum";
import {FamilyDetailModel} from "../../../models/family.model";
import {StringResources} from "../../../enum/string-resources";
import {NavigationPathEnum} from "../../../enum/navigation-path-enum";

@Component({
  selector: 'app-family-detail',
  templateUrl: './family-detail.component.html',
  styleUrls: ['./family-detail.component.scss']
})
export class FamilyDetailComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  stringRes = StringResources;

  id: number;
  familyDetailModel: FamilyDetailModel;
  noData: boolean = false;

  activeTab = 0;

  constructor(private httpService: HttpService,
              private snackBarService: SnackBarService,
              private navigationService: NavigationService,
              private activatedRoute: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  async ngOnInit(): Promise<void> {
    if (this.id) {
      await this.loadDataById(this.id);
      this.activeTab = 0;
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
  }

  editFamily() {
    this.navigationService.navigateToById(NavigationPathEnum.FAMILY_EDIT_PERSONAL_DETAIL, this.id);
  }

  async loadDataById(id: number): Promise<void> {
    this.noData = false;
    const payload = {
      id: id
    };
    const res: ResponseDataModel = await this.httpService.getRequest(ApiUrlEnum.FAMILY_DETAIL, payload, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.familyDetailModel = FamilyDetailModel.fromJson(res.data);
          break;
        case ServerResponseEnum.WARNING:
          this.noData = true;
          // this.snackBarService.showWarning(res.message);
          break;
        case ServerResponseEnum.ERROR:
          this.snackBarService.showError(res.message);
          break;
      }
    }
  }

  goToFamilyList(event: any): void {
    this.navigationService.navigateTo(NavigationPathEnum.FAMILY_LIST);
  }

}
