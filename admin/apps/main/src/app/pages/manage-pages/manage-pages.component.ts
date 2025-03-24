import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { ActivatedRoute } from '@angular/router';
import { LabelService, NavigationService, SnackBarService, TOOLBAR } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { FileTypeEnum, ICommonSEO, IManageLegalPage, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { PagesService } from '../../services/pages.service';

@Component({
  selector: 'vsd-admin-manage-pages',
  templateUrl: './manage-pages.component.html',
  standalone: false,
  styleUrl: './manage-pages.component.scss',
})
export class ManagePagesComponent implements OnInit, OnDestroy {

  labelKeys = LabelKey;
  id!: number;
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

  constructor(private activatedRoute: ActivatedRoute, private pagesService: PagesService,
              public labelService: LabelService, private title: Title,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {
    console.log(this.activatedRoute.snapshot);
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
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
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
