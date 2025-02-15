import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  HttpService,
  LabelService,
  MASTER_PAGE_SIZE,
  NavigationPathEnum,
  NavigationService,
  PAGE_SIZE_LIST,
  SnackBarService,
  TableDataDatasource
} from "@vsd-frontend/core-lib";
import {FormControl} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {Title} from "@angular/platform-browser";
import {debounceTime, distinctUntilChanged, tap} from "rxjs";
import {IFamilyList, ITableListFilter, LabelKey} from "@vsd-common/lib";
import {FamilyService} from "../family.service";
import {FamilyApiUrl} from "../api-url";

@Component({
  selector: 'lib-family',
  templateUrl: './family.component.html',
  standalone: false,
  styleUrl: './family.component.scss',
})
export class FamilyComponent implements OnInit, AfterViewInit {
  labelKeys = LabelKey;
  title!: string;
  displayedColumns = [
    'seqNo',
    'imagePath',
    'firstName',
    'middleName',
    'lastName',
    'active',
    'createdByUser',
    'createdAt',
    'updatedByUser',
    'updatedAt',
    'action',
  ];
  dataSource!: TableDataDatasource<IFamilyList>;
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
    private service: FamilyService,
    private navigationService: NavigationService,
    private snackbarService: SnackBarService
  ) {
    this.title = this.labelService.getLabel(LabelKey.SIDE_MENU_FAMILY);
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
    this.navigationService.navigateTo(NavigationPathEnum.FAMILY_MANAGE);
  }

  edit(obj: IFamilyList) {
    this.navigationService.navigateToById(NavigationPathEnum.FAMILY_MANAGE, obj.familyId);
  }

  async changeStatus(status: boolean, index: number, obj: IFamilyList) {
    await this.service.changeStatus(obj.familyId, !obj.active);
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
    await this.dataSource.loadData(FamilyApiUrl.FAMILY, this.payload);
  }
}
