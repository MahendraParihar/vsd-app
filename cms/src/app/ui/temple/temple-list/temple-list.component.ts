import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {tap} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {UntypedFormBuilder} from "@angular/forms";
import {TempleDatasource} from "../temple.datasource";
import {StringResources} from "../../../enum/string-resources";
import {HttpService} from "../../../service/http.service";
import {SnackBarService} from "../../../service/snack-bar.service";
import {NavigationService} from "../../../service/navigation.service";
import {NavigationPathEnum} from "../../../enum/navigation-path-enum";
import {TempleModel} from "../../../models/temple.model";
import {AlertDialogDataInterface} from "../../../interfaces/alert-dialog-data.interface";
import {DialogAlertComponent} from "../../common-ui/dialog-alert/dialog-alert.component";
import {ApiUrlEnum} from "../../../enum/api-url-enum";
import {ResponseDataModel} from "../../../models/response-data.model";
import {ServerResponseEnum} from "../../../enum/server-response-enum";
import {Constants} from "../../../constants/Constants";
import {CommonSearchModel} from "../../../models/common-search.model";
import {DialogTempleDetailComponent} from "../dialog-temple-detail/dialog-temple-detail.component";
import {AlertTypeEnum} from "../../../enum/alert-type-enum";

@Component({
  selector: 'app-temple-list',
  templateUrl: './temple-list.component.html',
  styleUrls: ['./temple-list.component.scss']
})
export class TempleListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ["seqNo", 'title', 'status', "action"];
  dataSource: TempleDatasource;
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
    this.dataSource = new TempleDatasource(this.httpService, this.snackBarService);
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
    this.navigationService.navigateTo(NavigationPathEnum.TEMPLE_MANAGE);
  }

  onEditClick(id: number) {
    this.navigationService.navigateToById(NavigationPathEnum.TEMPLE_MANAGE, id);
  }

  onDeleteClick(item: TempleModel, index: number) {
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

  async updateStatusTask(item: TempleModel, index: number): Promise<void> {
    const payload = {
      id: item.id,
      active: !item.active
    };

    const res: ResponseDataModel = await this.httpService.putRequest(ApiUrlEnum.TEMPLE_UPDATE_STATUS, payload, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.snackBarService.showSuccess(res.message);
          await this.loadDataSet();
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

  async loadTempleDetail(id: number): Promise<void> {
    let templeDetailObj: TempleModel;
    const payload = {
      id: id
    };
    const res: ResponseDataModel = await this.httpService.getRequest(ApiUrlEnum.TEMPLE_MANAGE, payload, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          templeDetailObj = TempleModel.fromJson(res.data);
          this.viewDetail(templeDetailObj);
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

  viewDetail(tempObj: TempleModel): void {
    const dialogRef = this.dialog.open(DialogTempleDetailComponent, {
      data: tempObj,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', JSON.stringify(result));
    });
  }
}
