import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAddressMaster, IManageAddress, InputLength, IOption, LabelKey } from '@vsd-common/lib';

@Component({
  selector: 'vsd-ui-address-form',
  templateUrl: './ui-address-form.component.html',
  styleUrl: './ui-address-form.component.scss',
})
export class UiAddressFormComponent implements OnInit {

  labelKeys = LabelKey;
  inputLength = InputLength;
  stateList: IOption[] = [];
  districtList: IOption[] = [];
  cityVillageList: IOption[] = [];
  _address!: IManageAddress;

  @Input()
  formGroup!: FormGroup;

  @Input()
  masterData!: IAddressMaster;

  @Input() set address(tempAddress: IManageAddress) {
    this._address = tempAddress;
    this.bindAddress();
  }

  @Input()
  labels!: Map<string, string>;

  addressFormGroup: FormGroup = new FormGroup({
    addressId: new FormControl(null),
    addressTypeId: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.MAX_ADDRESS)]),
    pinCode: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_10)]),
    latitude: new FormControl(null, [Validators.maxLength(InputLength.CHAR_50)]),
    longitude: new FormControl(null, [Validators.maxLength(InputLength.CHAR_50)]),
    countryId: new FormControl(null, [Validators.required]),
    stateId: new FormControl(null, [Validators.required]),
    districtId: new FormControl(null, [Validators.required]),
    cityVillageId: new FormControl(null, [Validators.required]),
  });

  ngOnInit() {
    this.formGroup.addControl('address', this.addressFormGroup);
    this.bindAddress();
  }

  bindAddress() {
    if (!this._address) {
      return;
    }
    this.findStates(this._address.countryId);
    this.findDistricts(this._address.stateId);
    this.findCityVillages(this._address.districtId);
    this.addressFormGroup.patchValue({
      addressId: this._address.addressId,
      addressTypeId: this._address.addressTypeId,
      address: this._address.address,
      pinCode: this._address.pinCode,
      latitude: this._address.latitude,
      longitude: this._address.longitude,
      countryId: this._address.countryId,
      stateId: this._address.stateId,
      districtId: this._address.districtId,
      cityVillageId: this._address.cityVillageId,
    });
  }

  findStates(countryId: number | IOption) {
    this.stateList = this.masterData.states.filter((p) => {
      return p.parentId = typeof countryId === 'number' ? countryId : countryId.id;
    });
  }

  findDistricts(stateId: number | IOption) {
    this.districtList = this.masterData.districts.filter((p) => {
      return p.parentId = typeof stateId === 'number' ? stateId : stateId.id;
    });
  }

  findCityVillages(districtId: number | IOption) {
    this.cityVillageList = this.masterData.cityVillages.filter((p) => {
      return p.parentId = typeof districtId === 'number' ? districtId : districtId.id;
    });
  }
}
