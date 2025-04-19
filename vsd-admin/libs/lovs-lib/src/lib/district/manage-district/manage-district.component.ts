import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService, LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { IAddressMaster, IManageDistrict, InputLength, IOption, LabelKey } from '@vsd-common/lib';
import { DistrictService } from '../district.service';

@Component({
  selector: 'lovs-lib-manage-district',
  standalone: false,
  templateUrl: './manage-district.component.html',
  styleUrl: './manage-district.component.scss',
})
export class ManageDistrictComponent implements OnInit {
  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  lovModel!: IManageDistrict;
  addressMaster!: IAddressMaster;
  stateList: IOption[] = [];

  formGroup: FormGroup = new FormGroup({
    district: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_100)]),
    countryId: new FormControl(null, [Validators.required]),
    stateId: new FormControl(null, [Validators.required]),
  });

  constructor(
    private service: DistrictService,
    public labelService: LabelService,
    private title: Title,
    private snackBarService: SnackBarService,
    private navigation: NavigationService,
    private addressService: AddressService,
  ) {
    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_DISTRICT : this.labelKeys.ADD_DISTRICT);
    this.title.setTitle(this.pageTitle);
  }

  async ngOnInit() {
    this.addressMaster = await this.addressService.loadAddressMasterData();
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
    if (this.lovModel.districtId && this.addressMaster && this.addressMaster.districts) {
      const state: IOption | undefined = this.addressMaster.states.find((p) => {
        return p.id === this.lovModel.districtId;
      });
      if (state && state.parentId) {
        this.findStates(state.parentId);
        this.formGroup.patchValue({
          countryId: state.parentId,
        });
      }
    }
    this.formGroup.patchValue({
      district: this.lovModel.district,
      stateId: this.lovModel.stateId,
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
    const payload: IManageDistrict = {
      district: this.formGroup.value.district,
      stateId: this.formGroup.value.stateId,
    };
    if (this.id) {
      payload.districtId = Number(this.id);
    }
    try {
      await this.service.manageDistrict(payload);
      this.snackBarService.showSuccess(
        this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED),
      );
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }

  findStates(countryId: number | IOption) {
    this.stateList = this.addressMaster.states.filter((p) => {
      return (p.parentId as number) === (typeof countryId === 'number' ? countryId : countryId.id);
    });
  }
}
