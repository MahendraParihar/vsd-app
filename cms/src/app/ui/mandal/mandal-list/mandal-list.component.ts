import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {tap} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {StringResources} from "../../../enum/string-resources";
import {ServerResponseEnum} from "../../../enum/server-response-enum";
import {ApiUrlEnum} from "../../../enum/api-url-enum";
import {ResponseDataModel} from "../../../models/response-data.model";
import {MandalModel} from "../../../models/mandal.model";
import {AlertDialogDataInterface} from "../../../interfaces/alert-dialog-data.interface";
import {DialogAlertComponent} from "../../common-ui/dialog-alert/dialog-alert.component";
import {NavigationPathEnum} from "../../../enum/navigation-path-enum";
import {HttpService} from "../../../service/http.service";
import {SnackBarService} from "../../../service/snack-bar.service";
import {NavigationService} from "../../../service/navigation.service";
import {MandalDatasource} from "../datasource/mandal.datasource";
import {Constants} from "../../../constants/Constants";
import {AlertTypeEnum} from "../../../enum/alert-type-enum";

@Component({
  selector: 'app-mandal-list',
  templateUrl: './mandal-list.component.html',
  styleUrls: ['./mandal-list.component.scss']
})
export class MandalListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns = ["seqNo", 'mandal', 'status', "action"];
  dataSource: MandalDatasource;
  totalCount = 0;

  stringRes = StringResources;
  searchFormGroup: FormGroup = this.fb.group({
    name: new FormControl(''),
    active: new FormControl(''),
    createdFrom: new FormControl(''),
    createdTo: new FormControl('')
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
    this.dataSource = new MandalDatasource(this.httpService, this.snackBarService);
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
    this.navigationService.navigateTo(NavigationPathEnum.MANDAL_MANAGE);
  }

  onEditClick(id: number) {
    this.navigationService.navigateToById(NavigationPathEnum.MANDAL_MANAGE, id);
  }

  onDeleteClick(item: MandalModel, index: number) {
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

  async updateStatusTask(item: MandalModel, index: number): Promise<void> {
    const payload = {
      id: item.mandalId,
      active: !item.active
    };

    const res: ResponseDataModel = await this.httpService.putRequest(ApiUrlEnum.MANDAL_UPDATE_STATUS, payload, true);
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
