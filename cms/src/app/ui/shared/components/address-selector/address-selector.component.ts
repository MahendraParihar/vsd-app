import {Component, Input, OnInit} from '@angular/core';
import {CountryModel} from "../../../../models/country.model";
import {StateModel} from "../../../../models/state.model";
import {DistrictModel} from "../../../../models/district.model";
import {CityVillageModel} from "../../../../models/city-village.model";
import {HttpService} from "../../../../service/http.service";
import {AddressModel} from "../../../../models/address.model";
import {ApiUrlEnum} from "../../../../enum/api-url-enum";
import {ServerResponseEnum} from "../../../../enum/server-response-enum";
import {SnackBarService} from "../../../../service/snack-bar.service";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {InputLength} from "../../../../constants/input-length";
import {StringResources} from "../../../../enum/string-resources";
import {AddressTypeModel} from "../../../../models/address-type.model";
import 'lodash';
import {ValidationUtil} from "../../../../utilites/validation-util";

declare var _: any;

@Component({
  selector: 'app-address-selector',
  templateUrl: './address-selector.component.html',
  styleUrls: ['./address-selector.component.scss']
})
export class AddressSelectorComponent implements OnInit {

  @Input()
  addressModel?: AddressModel;

  @Input()
  formGroup: UntypedFormGroup;

  @Input()
  showLatLong: boolean = false;

  @Input()
  showAddressType: boolean = false;

  stringRes = StringResources;
  inputLength = InputLength;

  addressTypeList: AddressTypeModel[] = [];
  addressCountryList: CountryModel[] = [];
  masterStateList: StateModel[] = [];
  addressStateList: StateModel[] = [];
  masterDistrictList: DistrictModel[] = [];
  addressDistrictList: DistrictModel[] = [];
  masterCityVillageListList: CityVillageModel[] = [];
  addressCityVillageListList: CityVillageModel[] = [];

  addressForm: UntypedFormGroup = this.fb.group({
    addressTypeId: [null, []],
    address: [null, [Validators.required, Validators.minLength(InputLength.MIN_ADDRESS), Validators.maxLength(InputLength.MAX_ADDRESS)]],
    pinCode: [null, [Validators.required, Validators.minLength(InputLength.PIN_CODE), Validators.maxLength(InputLength.PIN_CODE)]],
    countryId: [null, [Validators.required]],
    stateId: [null, [Validators.required]],
    districtId: [null, [Validators.required]],
    cityVillageId: [null, [Validators.required]],
    latitude: [null, []],
    longitude: [null, []]
  });

  constructor(private httpService: HttpService,
              private fb: UntypedFormBuilder,
              private snackBarService: SnackBarService) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadMasterData();
    if (!this.addressModel) {
      this.addressModel = new AddressModel();
    }
    this.addAddressFormControl();
  }

  get formControl() {
    return this.addressForm.controls;
  }

  async loadMasterData(): Promise<boolean> {
    const apiResponse = await this.httpService.getRequest(ApiUrlEnum.ADDRESS_MASTER, null, true);
    if (!apiResponse) {
      return false;
    }
    switch (apiResponse.code) {
      case ServerResponseEnum.SUCCESS:
        const tempCountry = apiResponse.data.country;
        const tempState = apiResponse.data.state;
        const tempDistrict = apiResponse.data.district;
        const tempCityVillage = apiResponse.data.cityVillage;
        const tempAddressType = apiResponse.data.addressType;
        this.addressCountryList = [];
        this.masterStateList = [];
        this.masterDistrictList = [];
        this.masterCityVillageListList = [];
        this.addressTypeList = [];
        for (const s of tempCountry) {
          this.addressCountryList.push(CountryModel.fromJson(s));
        }
        for (const s of tempState) {
          this.masterStateList.push(StateModel.fromJson(s));
        }
        for (const s of tempDistrict) {
          this.masterDistrictList.push(DistrictModel.fromJson(s));
        }
        for (const s of tempCityVillage) {
          this.masterCityVillageListList.push(CityVillageModel.fromJson(s));
        }
        for (const s of tempAddressType) {
          this.addressTypeList.push(AddressTypeModel.fromJson(s));
        }
        return true;
      case ServerResponseEnum.WARNING:
        this.snackBarService.showWarning(apiResponse.message);
        return false;
      case ServerResponseEnum.ERROR:
      default:
        this.snackBarService.showError(apiResponse.message);
        return false;
    }
  }

  addAddressFormControl(): void {
    if (this.showAddressType) {
      this.addressForm.get('addressTypeId').setValidators([Validators.required]);
      this.addressForm.get('addressTypeId').updateValueAndValidity();
    }
    this.addressForm.patchValue({
      addressTypeId:this.addressModel ? this.addressModel.addressTypeId : null,
      address:this.addressModel ? this.addressModel.address : null,
      pinCode:this.addressModel ? this.addressModel.pinCode : null,
      countryId:this.addressModel ? this.addressModel.countryId : null,
      stateId:this.addressModel ? this.addressModel.stateId : null,
      districtId:this.addressModel ? this.addressModel.districtId : null,
      cityVillageId:this.addressModel ? this.addressModel.cityVillageId : null,
      latitude:this.addressModel ? this.addressModel.latitude : null,
      longitude:this.addressModel ? this.addressModel.longitude : null,
    });
    this.formGroup.addControl('address', this.addressForm);
    this.onCountryChange();
    this.onStateChange();
    this.onDistrictChange();
  }

  onCountryChange() {
    if (this.addressForm.value.countryId && this.addressForm.value.countryId > 0) {
      // enable state
      this.addressStateList = _.filter(this.masterStateList, {countryId: this.addressForm.value.countryId})
      this.addressForm.get('stateId').enable();
    } else {
      // disable state
      this.addressForm.get('stateId').disable();
      this.addressForm.patchValue({
        stateId: null,
        districtId: null,
        cityVillageId: null
      });
    }
    this.onStateChange();
    this.onDistrictChange();
  }

  onStateChange() {
    if (this.addressForm.value.stateId && this.addressForm.value.stateId > 0) {
      // enable state
      this.addressDistrictList = _.filter(this.masterDistrictList, {stateId: this.addressForm.value.stateId})
      this.addressForm.get('districtId').enable();
    } else {
      // disable state
      this.addressForm.get('districtId').disable();
      this.addressForm.patchValue({
        districtId: null,
        cityVillageId: null
      });
    }
    this.onDistrictChange();
  }

  onDistrictChange() {
    if (this.addressForm.value.districtId && this.addressForm.value.districtId > 0) {
      // enable state
      this.addressCityVillageListList = _.filter(this.masterCityVillageListList, {districtId: this.addressForm.value.districtId})
      this.addressForm.get('cityVillageId').enable();
    } else {
      // disable state
      this.addressForm.get('cityVillageId').disable();
      this.addressForm.patchValue({
        cityVillageId: null
      });
    }
  }
}
