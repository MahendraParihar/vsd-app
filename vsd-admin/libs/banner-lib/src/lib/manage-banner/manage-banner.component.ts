import { Component, Input, OnInit } from '@angular/core';
import {
  FileTypeEnum,
  IAddressMaster,
  ICommonSEO,
  IManageBanner,
  InputLength,
  IOption,
  LabelKey,
  MediaForEnum,
} from '@vsd-common/lib';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BannerService } from '../banner.service';
import { Title } from '@angular/platform-browser';
import { LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';

@Component({
  selector: 'banner-lib-manage-banner',
  standalone: false,
  templateUrl: './manage-banner.component.html',
  styleUrl: './manage-banner.component.scss',
})
export class ManageBannerComponent implements OnInit {
  inputLength = InputLength;
  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  addressMaster!: IAddressMaster;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  banner!: IManageBanner;
  seoData!: ICommonSEO;
  bannerFor: IOption[] = [
    { id: 'home', title: 'Home' },
    { id: 'temple', title: 'Temple' },
    { id: 'mandal', title: 'Mandal' },
    { id: 'event', title: 'Event' },
    { id: 'facility', title: 'Facility' },
    { id: 'family', title: 'Family' },
    { id: 'about_us', title: 'About Us' },
    { id: 'contact_us', title: 'Contact Us' },
    { id: 'term_condition', title: 'Terms and Condition' },
  ];

  formGroup: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_100)]),
    subtitle: new FormControl(null, Validators.maxLength(InputLength.CHAR_200)),
    fromDate: new FormControl(null, [Validators.required]),
    toDate: new FormControl(null),
    url: new FormControl(null),
    isInternalUrl: new FormControl(null),
    bannerFor: new FormControl(null, [Validators.required]),
  });

  constructor(
    private service: BannerService,
    public labelService: LabelService,
    private title: Title,
    private snackBarService: SnackBarService,
    private navigation: NavigationService,
  ) {
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

  bindData() {
    if (!this.banner) {
      return;
    }
    this.formGroup.patchValue({
      title: this.banner.title,
      subTitle: this.banner.subTitle,
      isInternalUrl: !!this.banner.isInternalUrl,
      url: this.banner.url,
      fromDate: this.banner.fromDate,
      toDate: this.banner.toDate,
      bannerFor: this.banner.bannerFor,
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
    const payload: IManageBanner = {
      title: this.formGroup.value.title,
      subTitle: this.formGroup.value.subTitle,
      isInternalUrl: !!this.formGroup.value.isInternalUrl,
      url: this.formGroup.value.url,
      fromDate: this.formGroup.value.fromDate,
      toDate: this.formGroup.value.toDate,
      bannerFor: this.formGroup.value.bannerFor,
      imagePath: this.formGroup.value.uploadFiles,
    };
    if (this.id) {
      payload.bannerId = this.id;
    }
    try {
      await this.service.manageBanner(payload);
      this.snackBarService.showSuccess(
        this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED),
      );
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
