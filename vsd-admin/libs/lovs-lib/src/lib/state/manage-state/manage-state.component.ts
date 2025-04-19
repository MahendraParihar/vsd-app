import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService, LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { IAddressMaster, IManageState, InputLength, LabelKey } from '@vsd-common/lib';
import { StateService } from '../state.service';

@Component({
  selector: 'lovs-lib-manage-state',
  templateUrl: './manage-state.component.html',
  standalone: false,
  styleUrl: './manage-state.component.scss',
})
export class ManageStateComponent implements OnInit {
  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  lovModel!: IManageState;
  addressMaster!: IAddressMaster;

  formGroup: FormGroup = new FormGroup({
    state: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_100)]),
    code: new FormControl(null, [Validators.maxLength(InputLength.CHAR_10)]),
    countryId: new FormControl(null, [Validators.required]),
  });

  constructor(
    private service: StateService,
    public labelService: LabelService,
    private title: Title,
    private snackBarService: SnackBarService,
    private navigation: NavigationService,
    private addressService: AddressService,
  ) {
    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_STATE : this.labelKeys.ADD_STATE);
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
    this.formGroup.patchValue({
      state: this.lovModel.state,
      code: this.lovModel.code,
      countryId: this.lovModel.countryId,
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
    const payload: IManageState = {
      state: this.formGroup.value.state,
      code: this.formGroup.value.code,
      countryId: this.formGroup.value.countryId,
    };
    if (this.id) {
      payload.stateId = Number(this.id);
    }
    try {
      await this.service.manageState(payload);
      this.snackBarService.showSuccess(
        this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED),
      );
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
