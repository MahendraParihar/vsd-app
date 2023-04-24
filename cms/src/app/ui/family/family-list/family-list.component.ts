import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {tap} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {StringResources} from "../../../enum/string-resources";
import {Constants} from "../../../constants/Constants";
import {HttpService} from "../../../service/http.service";
import {SnackBarService} from "../../../service/snack-bar.service";
import {NavigationService} from "../../../service/navigation.service";
import {NavigationPathEnum} from "../../../enum/navigation-path-enum";
import {AlertDialogDataInterface} from "../../../interfaces/alert-dialog-data.interface";
import {DialogAlertComponent} from "../../common-ui/dialog-alert/dialog-alert.component";
import {ServerResponseEnum} from "../../../enum/server-response-enum";
import {ResponseDataModel} from "../../../models/response-data.model";
import {ApiUrlEnum} from "../../../enum/api-url-enum";
import {FamilyDatasource} from "../family.datasource";
import {FamilyModel} from "../../../models/family.model";
import {CommonSearchModel} from "../../../models/common-search.model";
import {AlertTypeEnum} from "../../../enum/alert-type-enum";

@Component({
  selector: 'app-family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.scss']
})
export class FamilyListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ["seqNo", 'image', 'name', 'emailId', 'contactNumber', 'cityVillage', 'isApproved','approvedBy','status', "action"];
  dataSource: FamilyDatasource;
  totalCount = 0;

  stringRes = StringResources;

  defaultPageSize = Constants.DEFAULT_PAGE_SIZE;
  payload: CommonSearchModel = new CommonSearchModel();
  pageSizeList = Constants.PAGE_SIZE_LIST;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: UntypedFormBuilder,
              private httpService: HttpService,
              private snackBarService: SnackBarService,
              private navigationService: NavigationService,
              public dialog: MatDialog) {
    this.dataSource = new FamilyDatasource(this.httpService, this.snackBarService);
    this.dataSource.totalCount.subscribe((count: number) => this.totalCount = count);
  }

  async ngOnInit(): Promise<void> {
    await this.loadDataSet();
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.loadDataSet())
      )
      .subscribe();
  }

  ngOnDestroy(): void {

  }

  async loadDataSet(): Promise<void> {
    this.payload.pageNumber = this.paginator ? this.paginator.pageIndex : 0;
    this.payload.pageSize = this.paginator ? this.paginator.pageSize : Constants.DEFAULT_PAGE_SIZE;
    await this.dataSource.loadData(this.payload);
  }

  // region search
  async searchResult(searchObj: CommonSearchModel): Promise<void> {
    console.log(searchObj);
    if (searchObj) {
      this.payload.name = searchObj.name ? searchObj.name : null;
      this.payload.active = searchObj.active;
      this.payload.createdFrom = searchObj.createdFrom;
      this.payload.createdTo = searchObj.createdTo;
    } else {
      this.payload.name = null;
      this.payload.active = null;
      this.payload.createdFrom = null;
      this.payload.createdTo = null;
    }
    this.paginator.firstPage();
    await this.loadDataSet();
  }

  // endregion

  onAddClick() {
    this.navigationService.navigateTo(NavigationPathEnum.FAMILY_MANAGE);
  }

  onEditClick(id: number) {
    this.navigationService.navigateToById(NavigationPathEnum.FAMILY_MANAGE, id);
  }

  viewDetail(id: number) {
    this.navigationService.navigateToById(NavigationPathEnum.FAMILY_DETAIL, id);
  }

  onDeleteClick(item: FamilyModel, index: number) {
    const dialogData: AlertDialogDataInterface = {
      title: StringResources.ALERT,
      message: StringResources.CHANGE_STATUS_DESC,
      positiveBtnTxt: StringResources.YES,
      negativeBtnTxt: StringResources.NO,
      alertType:AlertTypeEnum.WARNING
    };
    const dialogRef = this.dialog.open(DialogAlertComponent, {
      width: '350px',
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', JSON.stringify(result));
      if (result) {
        this.updateStatusTask(item, index);
      }
    });
  }

  async updateStatusTask(item: FamilyModel, index: number): Promise<void> {
    const payload = {
      id: item.id,
      active: !item.active
    };

    const res: ResponseDataModel = await this.httpService.putRequest(ApiUrlEnum.FAMILY_UPDATE_STATUS, payload, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.snackBarService.showSuccess(res.message);
          item.active = !item.active;
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
