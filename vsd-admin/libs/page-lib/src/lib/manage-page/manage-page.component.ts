import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FileTypeEnum, ICommonSEO, IManageLegalPage, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LabelService, NavigationService, SnackBarService, TOOLBAR } from '@vsd-frontend/core-lib';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { Editor, Toolbar } from 'ngx-editor';
import { PageService } from '../page.service';

@Component({
  selector: 'page-lib-manage-page',
  standalone: false,
  templateUrl: './manage-page.component.html',
  styleUrl: './manage-page.component.scss',
})
export class ManagePageComponent implements OnInit, OnDestroy {
  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  legalPage!: IManageLegalPage;
  seoData!: ICommonSEO;
  editor!: Editor;
  toolbar: Toolbar = TOOLBAR;

  formGroup: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
    details: new FormControl(null, [Validators.required]),
  });

  constructor(
    private pagesService: PageService,
    public labelService: LabelService,
    private title: Title,
    private snackBarService: SnackBarService,
    private navigation: NavigationService,
  ) {
    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_PAGE : this.labelKeys.ADD_PAGE);
    this.title.setTitle(this.pageTitle);
  }

  async ngOnInit() {
    this.editor = new Editor();
    await this.loadDetail();
  }

  async loadDetail() {
    if (!this.id) {
      return;
    }
    this.legalPage = await this.pagesService.loadDetails(this.id);
    this.bindData();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  bindData() {
    if (!this.legalPage) {
      return;
    }
    this.formGroup.patchValue({
      title: this.legalPage.title,
      details: this.legalPage.details,
    });
    this.seoData = {
      tags: this.legalPage.tags ? this.legalPage.tags : [],
      metaTitle: this.legalPage.metaTitle,
      metaDescription: this.legalPage.metaDescription,
      url: this.legalPage.url,
    };
  }

  onCancel() {
    this.navigation.back();
  }

  async updateDetails() {
    console.log(this.formGroup);
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }
    console.log(this.formGroup);
    const payload: IManageLegalPage = {
      title: this.formGroup.value.title,
      details: this.formGroup.value.details,
      ...this.formGroup.value.seo,
    };
    if (this.id) {
      payload.legalPageId = this.id;
    }
    try {
      await this.pagesService.managePages(payload);
      this.snackBarService.showSuccess(
        this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED),
      );
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
