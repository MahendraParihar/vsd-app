import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  HttpService,
  LabelService,
  MASTER_PAGE_SIZE,
  PAGE_SIZE_LIST,
  SnackBarService,
  TableDataDatasource,
} from '@vsd-frontend/core-lib';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { IInquiryList, ITableListFilter, LabelKey } from '@vsd-common/lib';
import { ApiUrl } from '../api.url';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'vsd-pages',
  templateUrl: './inquiry.component.html',
  standalone: false,
  styleUrl: './inquiry.component.scss',
})
export class InquiryComponent implements OnInit, AfterViewInit {
  labelKeys = LabelKey;
  title!: string;
  displayedColumns = [
    'seqNo',
    'name',
    'emailId',
    'contactNumber',
    'active',
    'createdByUser',
    'createdAt',
    'updatedByUser',
    'updatedAt',
    'action',
  ];
  dataSource!: TableDataDatasource<IInquiryList>;
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
    private service: PagesService,
    private snackbarService: SnackBarService,
  ) {
    this.title = this.labelService.getLabel(LabelKey.SIDE_MENU_INQUIRY);
    this.pageTitle.setTitle(this.title);
    this.dataSource = new TableDataDatasource(this.httpService);
    this.dataSource.totalCount.subscribe(
      (count: number) => (this.totalCount = count),
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

  viewMessage(obj: IInquiryList) {

  }

  async changeStatus(status: boolean, index: number, obj: IInquiryList) {
    await this.service.changeStatus(obj.inquiryId, !obj.active);
    this.snackbarService.showSuccess(this.labelService.getLabel(LabelKey.SUCCESS_STATUS_CHANGE));
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
    await this.dataSource.loadData(ApiUrl.INQUIRY, this.payload);
  }
}
