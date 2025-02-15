import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TableDataDatasource} from '../table-data.datasource';
import {
  HttpService,
  LabelService,
  MASTER_PAGE_SIZE,
  NavigationPathEnum,
  NavigationService,
  PAGE_SIZE_LIST,
  SnackBarService
} from '@vsd-frontend/core-lib';
import {MatPaginator} from '@angular/material/paginator';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs';
import {LovApiUrl} from '../api-url';
import {IPostList, ITableListFilter, LabelKey} from '@vsd-common/lib';
import {FormControl} from "@angular/forms";
import {Title} from "@angular/platform-browser";
import {CountryService} from "../country/country.service";

@Component({
  selector: 'lib-post',
  templateUrl: './post.component.html',
  standalone: false,
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit, AfterViewInit {
  labelKeys = LabelKey;
  title!: string;
  displayedColumns = [
    'seqNo',
    'imagePath',
    'post',
    'active',
    'createdByUser',
    'createdAt',
    'updatedByUser',
    'updatedAt',
    'action',
  ];
  dataSource!: TableDataDatasource<IPostList>;
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
    private service: CountryService,
    private navigationService: NavigationService,
    private snackbarService: SnackBarService
  ) {
    this.title = this.labelService.getLabel(LabelKey.SIDE_MENU_POST);
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
    this.navigationService.navigateTo(NavigationPathEnum.POST_MANAGE);
  }

  edit(obj: IPostList) {
    this.navigationService.navigateToById(NavigationPathEnum.POST_MANAGE, obj.postId);
  }

  async changeStatus(status: boolean, index: number, obj: IPostList) {
    await this.service.changeStatus(obj.postId, !obj.active);
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
    await this.dataSource.loadData(LovApiUrl.POST, this.payload);
  }
}
