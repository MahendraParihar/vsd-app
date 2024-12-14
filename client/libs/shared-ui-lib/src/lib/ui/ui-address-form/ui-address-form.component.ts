import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAddressMaster, InputLength, LabelKey } from '@vsd-common/lib';

@Component({
  selector: 'vsd-ui-address-form',
  templateUrl: './ui-address-form.component.html',
  styleUrl: './ui-address-form.component.scss',
})
export class UiAddressFormComponent implements OnInit {

  labelKeys = LabelKey;
  inputLength = InputLength;

  @Input()
  formGroup!: FormGroup;

  @Input()
  masterData!: IAddressMaster;

  @Input()
  labels!: Map<string, string>;

  addressFormGroup: FormGroup = new FormGroup({
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
  }

  findStates() {
    const countryId = this.addressFormGroup.value.countryId;
    if (!countryId) {
      return [];
    }
    return this.masterData.states.filter((p) => {
      return p.parentId = countryId;
    });
  }

  findDistricts() {
    const stateId = this.addressFormGroup.value.stateId;
    if (!stateId) {
      return [];
    }
    return this.masterData.districts.filter((p) => {
      return p.parentId = stateId;
    });
  }

  findCityVillages() {
    const districtId = this.addressFormGroup.value.districtId;
    if (!districtId) {
      return [];
    }
    return this.masterData.cityVillages.filter((p) => {
      return p.parentId = districtId;
    });
  }
}
