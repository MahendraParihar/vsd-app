import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LabelKey } from '@vsd-common/lib';

@Component({
  selector: 'vsd-ui-address-form',
  templateUrl: './ui-address-form.component.html',
  styleUrl: './ui-address-form.component.scss',
})
export class UiAddressFormComponent {

  labelKeys = LabelKey;
  countries: IOption;

  @Input()
  public labels: Map<string, string> = new Map<string, string>();

  formGroup: FormGroup = new FormGroup({
    address: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    addressTypeId: new FormControl('', [Validators.required]),
    pinCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    latitude: new FormControl('', [Validators.maxLength(50)]),
    longitude: new FormControl('', [Validators.maxLength(50)]),
    countryId: new FormControl('', [Validators.required]),
    stateId: new FormControl('', [Validators.required]),
    districtId: new FormControl('', [Validators.required]),
    cityVillageId: new FormControl('', [Validators.required]),
  });
}
