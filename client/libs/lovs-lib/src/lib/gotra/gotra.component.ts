import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { TableDataDatasource } from '../table-data.datasource';
import { HttpService, MASTER_PAGE_SIZE, PAGE_SIZE_LIST } from '@vsd-frontend/core-lib';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import { LovApiUrl } from '../api-url';
import { ITableListFilter, IGotraList } from '@vsd-common/lib';

@Component({
  selector: 'lib-gotra',
  templateUrl: './gotra.component.html',
  styleUrl: './gotra.component.scss',
})
export class GotraComponent implements OnInit, AfterViewInit {
  displayedColumns = ['seqNo', 'name', 'status', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt', 'action'];
  dataSource!: TableDataDatasource<IGotraList>;
  totalCount = 0;
  defaultPageSize = MASTER_PAGE_SIZE;
  pageSizeList = PAGE_SIZE_LIST;
  payload: ITableListFilter = {
    page: this.defaultPageSize,
    limit: this.pageSizeList[0],
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private httpService: HttpService) {
    this.dataSource = new TableDataDatasource(httpService);
    this.dataSource.totalCount.subscribe((count: number) => this.totalCount = count);
  }

  async ngOnInit() {
    await this.loadDataSet();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.paginator.page
        .pipe(
          tap(() => this.loadDataSet()),
        )
        .subscribe();
    }
  }

  async loadDataSet(): Promise<void> {
    this.payload.page = this.paginator ? this.paginator.pageIndex : 0;
    this.payload.limit = this.paginator ? this.paginator.pageSize : MASTER_PAGE_SIZE;
    await this.dataSource.loadData(LovApiUrl.GOTRA, this.payload);
  }
}
