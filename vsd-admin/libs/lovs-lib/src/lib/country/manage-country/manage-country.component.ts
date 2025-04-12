import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { FileTypeEnum, IManageCountry, InputLength, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { CountryService } from '../country.service';

@Component({
  selector: 'lovs-lib-manage-country',
  standalone: false,
  templateUrl: './manage-country.component.html',
  styleUrl: './manage-country.component.scss',
})
export class ManageCountryComponent implements OnInit {
  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  lovModel!: IManageCountry;

  formGroup: FormGroup = new FormGroup({
    country: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_100)]),
    countryCode: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_5)]),
    phoneNumberCode: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_5)]),
  });

  constructor(
    private service: CountryService,
    public labelService: LabelService,
    private title: Title,
    private snackBarService: SnackBarService,
    private navigation: NavigationService,
  ) {
    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_COUNTRY : this.labelKeys.ADD_COUNTRY);
    this.title.setTitle(this.pageTitle);
  }

  async ngOnInit() {
    await this.loadDetail();
  }

  async loadDetail() {
    if (!this.id) {
      return;
    }
    this.lovModel = await this.service.loadDetails(this.id);
    this.bindData();
  }

  bindData() {
    if (!this.lovModel) {
      return;
    }
    this.formGroup.patchValue({
      country: this.lovModel.country,
      countryCode: this.lovModel.countryCode,
      phoneNumberCode: this.lovModel.phoneNumberCode,
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
    const payload: IManageCountry = {
      country: this.formGroup.value.country,
      countryCode: this.formGroup.value.countryCode,
      phoneNumberCode: this.formGroup.value.phoneNumberCode,
    };
    if (this.id) {
      payload.countryId = Number(this.id);
    }
    try {
      await this.service.manageCountry(payload);
      this.snackBarService.showSuccess(
        this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED),
      );
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
