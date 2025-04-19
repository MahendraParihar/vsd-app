import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService, LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { IAddressMaster, IManageCityVillage, InputLength, IOption, LabelKey } from '@vsd-common/lib';
import { CityVillageService } from '../city-village.service';

@Component({
  selector: 'lovs-lib-manage-city-village',
  standalone: false,
  templateUrl: './manage-city-village.component.html',
  styleUrl: './manage-city-village.component.scss',
})
export class ManageCityVillageComponent implements OnInit {
  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  lovModel!: IManageCityVillage;
  addressMaster!: IAddressMaster;
  stateList: IOption[] = [];
  districtList: IOption[] = [];

  formGroup: FormGroup = new FormGroup({
    cityVillage: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_100)]),
    pinCode: new FormControl(null, [Validators.maxLength(InputLength.CHAR_10)]),
    stdCode: new FormControl(null, [Validators.maxLength(InputLength.CHAR_10)]),
    stateId: new FormControl(null, [Validators.required]),
    districtId: new FormControl(null, [Validators.required]),
    countryId: new FormControl(null, [Validators.required]),
  });

  constructor(
    private service: CityVillageService,
    public labelService: LabelService,
    private title: Title,
    private snackBarService: SnackBarService,
    private navigation: NavigationService,
    private addressService: AddressService,
  ) {
    this.pageTitle = this.labelService.getLabel(
      this.id ? this.labelKeys.EDIT_CITY_VILLAGE : this.labelKeys.ADD_CITY_VILLAGE,
    );
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
      const district: IOption | undefined = this.addressMaster.districts.find((p) => {
        return p.id === this.lovModel.districtId;
      });
      const state: IOption | undefined = this.addressMaster.states.find((p) => {
        return p.id === (district ? district.parentId : null);
      });
      if (district && state && state.parentId && state.id) {
        this.findStates(state.parentId);
        this.findDistricts(Number(state.id));
        this.formGroup.patchValue({
          countryId: state ? state.parentId : null,
          stateId: state ? state.id : null,
          districtId: district ? district.id : null,
        });
      }
    }

    this.formGroup.patchValue({
      cityVillage: this.lovModel.cityVillage,
      districtId: this.lovModel.districtId,
      pinCode: this.lovModel.pinCode,
      stdCode: this.lovModel.stdCode,
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
    const payload: IManageCityVillage = {
      cityVillage: this.formGroup.value.cityVillage,
      districtId: this.formGroup.value.districtId,
      pinCode: this.formGroup.value.pinCode,
      stdCode: this.formGroup.value.stdCode,
    };
    if (this.id) {
      payload.cityVillageId = Number(this.id);
    }
    try {
      await this.service.manageCityVillage(payload);
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

  findDistricts(stateId: number | IOption) {
    this.districtList = this.addressMaster.districts.filter((p) => {
      return (p.parentId as number) === (typeof stateId === 'number' ? stateId : stateId.id);
    });
  }
}
