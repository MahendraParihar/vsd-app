import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  HttpService,
  LabelService,
  MASTER_PAGE_SIZE,
  NavigationPathEnum,
  NavigationService,
  PAGE_SIZE_LIST,
  SnackBarService, TableDataDatasource
} from "@vsd-frontend/core-lib";
import {FormControl} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {Title} from "@angular/platform-browser";
import {debounceTime, distinctUntilChanged, tap} from "rxjs";
import {IMandalList, ITableListFilter, LabelKey} from "@vsd-common/lib";
import {MandalApiUrl} from "../api-url";
import {MandalService} from "../mandal.service";

@Component({
  selector: 'lib-mandal',
  templateUrl: './mandal.component.html',
  styleUrl: './mandal.component.scss',
})
export class MandalComponent implements OnInit, AfterViewInit {
  labelKeys = LabelKey;
  title!:string;
  displayedColumns = [
    'seqNo',
    'imagePath',
    'title',
    'active',
    'createdByUser',
    'createdAt',
    'updatedByUser',
    'updatedAt',
    'action',
  ];
  dataSource!: TableDataDatasource<IMandalList>;
  totalCount = 0;
  defaultPageSize = MASTER_PAGE_SIZE;
  pageSizeList = PAGE_SIZE_LIST;
  searchControl: FormControl = new FormControl('');
  payload: ITableListFilter = {
    page: this.defaultPageSize,
    limit: this.pageSizeList[0],
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private httpService: HttpService,
    public labelService: LabelService,
    private pageTitle: Title,
    private service: MandalService,
    private navigationService: NavigationService,
    private snackbarService: SnackBarService
  ) {
    this.title = this.labelService.getLabel(LabelKey.SIDE_MENU_MANDAL);
    this.pageTitle.setTitle(this.title);
    this.dataSource = new TableDataDatasource(this.httpService);
    this.dataSource.totalCount.subscribe(
      (count: number) => (this.totalCount = count)
    );
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((query) => {
        this.paginator.pageIndex = 0;
        this.loadDataSet();
      });
  }

  async ngOnInit() {
    await this.loadDataSet();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator.page.pipe(tap(() => this.loadDataSet())).subscribe();
    }
  }

  get searchControlValue() {
    return this.searchControl.value;
  }

  add() {
    this.navigationService.navigateTo(NavigationPathEnum.MANDAL_MANAGE);
  }

  edit(obj: IMandalList) {
    this.navigationService.navigateToById(NavigationPathEnum.MANDAL_MANAGE, obj.mandalId);
  }

  async changeStatus(status: boolean, index: number, obj: IMandalList) {
    await this.service.changeStatus(obj.mandalId, !obj.active);
    this.snackbarService.showSuccess(this.labelService.getLabel(LabelKey.SUCCESS_STATUS_CHANGE))
    await this.loadDataSet();
  }

  async clearSearch() {
    this.paginator.firstPage();
    this.searchControl.setValue('');
  }

  async loadDataSet(): Promise<void> {
    this.payload.search = this.searchControl.value
      ? this.searchControl.value
      : '';
    this.payload.page = this.paginator ? this.paginator.pageIndex : 0;
    this.payload.limit = this.paginator
      ? this.paginator.pageSize
      : MASTER_PAGE_SIZE;
    await this.dataSource.loadData(MandalApiUrl.MANDAL, this.payload);
  }
}
