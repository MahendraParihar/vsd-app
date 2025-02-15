import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BannerService } from '../banner.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelService, NavigationService, SnackBarService, TOOLBAR } from '@vsd-frontend/core-lib';
import {
  FileTypeEnum,
  IAddressMaster,
  ICommonSEO,
  IManageBanner,
  InputLength,
  LabelKey,
  MediaForEnum,
} from '@vsd-common/lib';
import { Title } from '@angular/platform-browser';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'vsd-manage-banner',
  templateUrl: './manage-banner.component.html',
  standalone: false,
  styleUrl: './manage-banner.component.scss',
})
export class ManageBannerComponent implements OnInit, OnDestroy {

  inputLength = InputLength;
  labelKeys = LabelKey;
  id!: number;
  pageTitle!: string;
  addressMaster!: IAddressMaster;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  banner!: IManageBanner;
  seoData!: ICommonSEO;
  editor!: Editor;
  toolbar: Toolbar = TOOLBAR;

  formGroup: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_100)]),
    subtitle: new FormControl(null, Validators.maxLength(InputLength.CHAR_200)),
    fromDate: new FormControl(null, [Validators.required]),
    toDate: new FormControl(null),
    url: new FormControl(null),
    isInternalUrl: new FormControl(null),
    phoneNumber: new FormControl(null, [Validators.pattern(ValidationUtil.PHONE_REGEX), Validators.maxLength(InputLength.MAX_CONTACT_NUMBER)]),
  });

  constructor(private activatedRoute: ActivatedRoute, private service: BannerService,
              public labelService: LabelService, private title: Title,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_BANNER : this.labelKeys.ADD_BANNER);
    this.title.setTitle(this.pageTitle);
  }

  async ngOnInit() {
    await this.loadDetail();
  }

  async loadDetail() {
    if (!this.id) {
      return;
    }
    this.banner = await this.service.loadDetails(this.id);
    this.bindData();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  bindData() {
    if (!this.banner) {
      return;
    }
    this.formGroup.patchValue({
      title: this.banner.title,
      subTitle: this.banner.subTitle,
      isInternalUrl: this.banner.isInternalUrl,
      url: this.banner.url,
      fromDate: this.banner.fromDate,
      toDate: this.banner.toDate,
    });
  }

  onCancel() {
    this.navigation.back();
  }

  async updateDetails() {
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }
    console.log(this.formGroup);
    const payload: IManageBanner = {
      title: this.formGroup.value.title,
      subTitle: this.formGroup.value.subTitle,
      isInternalUrl: this.formGroup.value.isInternalUrl,
      url: this.formGroup.value.url,
      fromDate: this.formGroup.value.fromDate,
      toDate: this.formGroup.value.toDate,
      imagePath: this.formGroup.value.uploadFiles,
    };
    if (this.id) {
      payload.bannerId = this.id;
    }
    try {
      await this.service.manageBanner(payload);
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
