import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StringResources} from "../../../../enum/string-resources";
import {Constants} from "../../../../constants/Constants";
import {MatPaginator} from "@angular/material/paginator";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {HttpService} from "../../../../service/http.service";
import {SnackBarService} from "../../../../service/snack-bar.service";
import {NavigationService} from "../../../../service/navigation.service";
import {MatDialog} from "@angular/material/dialog";
import {tap} from "rxjs";
import {NavigationPathEnum} from "../../../../enum/navigation-path-enum";
import {AlertDialogDataInterface} from "../../../../interfaces/alert-dialog-data.interface";
import {DialogAlertComponent} from "../../../common-ui/dialog-alert/dialog-alert.component";
import {ResponseDataModel} from "../../../../models/response-data.model";
import {ServerResponseEnum} from "../../../../enum/server-response-enum";
import {ApiUrlEnum} from "../../../../enum/api-url-enum";
import {DistrictDatasource} from "../../datasource/district.datasource";
import {DistrictModel} from "../../../../models/district.model";
import {AlertTypeEnum} from "../../../../enum/alert-type-enum";

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.scss']
})
export class DistrictListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ["seqNo", 'title','state','country', 'status', "action"];
  dataSource: DistrictDatasource;
  totalCount = 0;

  stringRes = StringResources;
  searchFormGroup: UntypedFormGroup = this.fb.group({
    name: [''],
    active: [''],
    createdFrom: [''],
    createdTo: ['']
  });

  defaultPageSize = Constants.DEFAULT_PAGE_SIZE;
  payload = {
    name: '',
    active: '',
    createdFrom: '',
    createdTo: '',
    pageNumber: 0,
    pageSize: this.defaultPageSize
  };
  pageSizeList = Constants.PAGE_SIZE_LIST;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private fb: UntypedFormBuilder,
              private httpService: HttpService,
              private snackBarService: SnackBarService,
              private navigationService: NavigationService,
              public dialog: MatDialog) {
    this.dataSource = new DistrictDatasource(this.httpService, this.snackBarService);
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
    const formValue = this.searchFormGroup.value;
    this.payload.active = formValue.active;
    this.payload.name = formValue.name;
    this.payload.createdFrom = formValue.createdFrom;
    this.payload.createdTo = formValue.createdTo;
    this.payload.pageNumber = this.paginator ? this.paginator.pageIndex : 0;
    this.payload.pageSize = this.paginator ? this.paginator.pageSize : Constants.DEFAULT_PAGE_SIZE;
    await this.dataSource.loadData(this.payload);
  }

  // region search
  async clearSearchForm(): Promise<void> {
    this.searchFormGroup.reset();
    this.paginator.firstPage();
    await this.loadDataSet();
  }

  async searchResult(): Promise<void> {
    this.paginator.firstPage();
    await this.loadDataSet();
  }

  // endregion

  onAddClick() {
    this.navigationService.navigateTo(NavigationPathEnum.DISTRICT_MANAGE);
  }

  onEditClick(id: number) {
    this.navigationService.navigateToById(NavigationPathEnum.DISTRICT_MANAGE, id);
  }

  onDeleteClick(item: DistrictModel, index: number) {
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

  async updateStatusTask(item: DistrictModel, index: number): Promise<void> {
    const payload = {
      id: item.id,
      active: !item.active
    };

    const res: ResponseDataModel = await this.httpService.putRequest(ApiUrlEnum.DISTRICT_UPDATE_STATUS, payload, true);
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

}
