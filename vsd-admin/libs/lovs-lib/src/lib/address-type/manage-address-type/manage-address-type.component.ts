import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { FileTypeEnum, IManageAddressType, InputLength, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { AddressTypeService } from '../address-type.service';

@Component({
  selector: 'lovs-lib-manage-address-type',
  standalone: false,
  templateUrl: './manage-address-type.component.html',
  styleUrl: './manage-address-type.component.scss',
})
export class ManageAddressTypeComponent implements OnInit {
  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  addressType!: IManageAddressType;

  formGroup: FormGroup = new FormGroup({
    addressType: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_50)]),
  });

  constructor(
    private service: AddressTypeService,
    public labelService: LabelService,
    private title: Title,
    private snackBarService: SnackBarService,
    private navigation: NavigationService,
  ) {
    this.pageTitle = this.labelService.getLabel(
      this.id ? this.labelKeys.EDIT_ADDRESS_TYPE : this.labelKeys.ADD_ADDRESS_TYPE,
    );
    this.title.setTitle(this.pageTitle);
  }

  async ngOnInit() {
    await this.loadDetail();
  }

  async loadDetail() {
    if (!this.id) {
      return;
    }
    this.addressType = await this.service.loadDetails(this.id);
    this.bindData();
  }

  bindData() {
    if (!this.addressType) {
      return;
    }
    this.formGroup.patchValue({
      addressType: this.addressType.addressType,
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
    const payload: IManageAddressType = {
      addressType: this.formGroup.value.addressType,
      imagePath: this.formGroup.value.uploadFiles,
    };
    if (this.id) {
      payload.addressTypeId = Number(this.id);
    }
    try {
      await this.service.manageAddressType(payload);
      this.snackBarService.showSuccess(
        this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED),
      );
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
