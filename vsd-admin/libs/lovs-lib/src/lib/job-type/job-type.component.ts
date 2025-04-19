import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TableDataDatasource } from '../table-data.datasource';
import {
  HttpService,
  LabelService,
  MASTER_PAGE_SIZE,
  NavigationPathEnum,
  PAGE_SIZE_LIST,
  SnackBarService,
} from '@vsd-frontend/core-lib';
import { MatPaginator } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { LovApiUrl } from '../api-url';
import { IJobTypeList, ITableListFilter, LabelKey } from '@vsd-common/lib';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { JobTypeService } from './job-type.service';

@Component({
  selector: 'lovs-lib-job-type',
  standalone: false,
  templateUrl: './job-type.component.html',
  styleUrl: './job-type.component.scss',
})
export class JobTypeComponent implements OnInit, AfterViewInit {
  labelKeys = LabelKey;
  title!: string;
  displayedColumns = [
    'seqNo',
    'imagePath',
    'jobType',
    'active',
    'createdByUser',
    'createdAt',
    'updatedByUser',
    'updatedAt',
    'action',
  ];
  dataSource!: TableDataDatasource<IJobTypeList>;
  totalCount = 0;
  defaultPageSize = MASTER_PAGE_SIZE;
  pageSizeList = PAGE_SIZE_LIST;
  searchControl: FormControl = new FormControl('');
  payload: ITableListFilter = {
    page: this.defaultPageSize,
    limit: this.pageSizeList[0],
  };

  @Output() addEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<{ path: string; id: number }>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private httpService: HttpService,
    public labelService: LabelService,
    private pageTitle: Title,
    private service: JobTypeService,
    private snackbarService: SnackBarService,
  ) {
    this.title = this.labelService.getLabel(LabelKey.SIDE_MENU_JOB_TYPE);
    this.pageTitle.setTitle(this.title);
    this.dataSource = new TableDataDatasource(this.httpService);
    this.dataSource.totalCount.subscribe((count: number) => (this.totalCount = count));
    this.searchControl.valueChanges.pipe(debounceTime(400), distinctUntilChanged()).subscribe((query) => {
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
    this.addEvent.emit(NavigationPathEnum.JOB_TYPE_MANAGE);
  }

  edit(obj: IJobTypeList) {
    this.editEvent.emit({ path: NavigationPathEnum.JOB_TYPE_MANAGE, id: obj.jobTypeId });
  }

  async changeStatus(status: boolean, index: number, obj: IJobTypeList) {
    await this.service.changeStatus(obj.jobTypeId, !obj.active);
    this.snackbarService.showSuccess(this.labelService.getLabel(LabelKey.SUCCESS_STATUS_CHANGE));
    await this.loadDataSet();
  }

  async clearSearch() {
    this.paginator.firstPage();
    this.searchControl.setValue('');
  }

  async loadDataSet(): Promise<void> {
    this.payload.search = this.searchControl.value ? this.searchControl.value : '';
    this.payload.page = this.paginator ? this.paginator.pageIndex : 0;
    this.payload.limit = this.paginator ? this.paginator.pageSize : MASTER_PAGE_SIZE;
    await this.dataSource.loadData(LovApiUrl.JOB_TYPE, this.payload);
  }
}
