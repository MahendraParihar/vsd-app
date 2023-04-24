import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FamilyProfileModel} from "../../../models/family.model";
import {FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {InputLength} from "../../../constants/input-length";
import {StringResources} from "../../../enum/string-resources";
import {ResponseDataModel} from "../../../models/response-data.model";
import {ApiUrlEnum} from "../../../enum/api-url-enum";
import {ServerResponseEnum} from "../../../enum/server-response-enum";
import {JsonUtil} from "../../../utilites/json-util";
import {HttpService} from "../../../service/http.service";
import {DropdownItem} from "../../../interfaces/dropdown-item";
import {SnackBarService} from "../../../service/snack-bar.service";
import {ValidationUtil} from "../../../utilites/validation-util";
import {MatChipInputEvent} from "@angular/material/chips";

@Component({
  selector: 'app-family-personal-detail-manage',
  templateUrl: './family-personal-detail-manage.component.html',
  styleUrls: ['./family-personal-detail-manage.component.scss']
})
export class FamilyPersonalDetailManageComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

  @Input()
  familyProfileObj: FamilyProfileModel;

  @Input()
  formGroup: FormGroup;

  stringRes = StringResources;
  inputLength = InputLength;

  genderList: DropdownItem[];
  gotraList: DropdownItem[];
  maritalStatusList: DropdownItem[];
  raasiList: DropdownItem[];
  educationList: DropdownItem[];

  maxDate = new Date();
  minDate = new Date(this.maxDate.getFullYear() - 80);

  profileForm: FormGroup = this.fb.group({
    dateOfBirth: [null, []],
    height: [null, [ValidationUtil.heightValidation]],
    weight: [null, [ValidationUtil.weightValidation, Validators.max(150), Validators.maxLength(6)]],
    genderId: [null, [Validators.required]],
    maritalStatusId: [null, [Validators.required]],
    gotraId: [null, [Validators.required]],
    raasiId: [null, []],
    isMaglik: [null, []],
    description: [null, [Validators.minLength(InputLength.CHAR_5), Validators.maxLength(InputLength.CHAR_1000)]],
    hobbies: [null, []],
    monthlyIncome: [null, [ValidationUtil.numberValidation]]
  });
  hobbiesArray: string[]= [];

  hobbiesFormControl = new FormControl(['hobbies']);

  constructor(private fb: FormBuilder,
              private httpService: HttpService,
              private snackBarService: SnackBarService) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadMasterData();
    if(!this.familyProfileObj){
      this.familyProfileObj = new FamilyProfileModel();
    }
    this.bindData();
    this.formGroup.addControl('profile', this.profileForm);
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.bindData();
  }

  addHobbyFromInput(event: MatChipInputEvent) {
    if (event.value) {
      this.hobbiesArray.push(event.value);
      event.chipInput!.clear();
    }
    this.profileForm.patchValue({
      hobbies: this.hobbiesArray.join('|')
    })
  }

  removeHobby(index:number,keyword: string) {
    this.hobbiesArray.splice(index, 1);
    this.profileForm.patchValue({
      hobbies: this.hobbiesArray.join('|')
    })
  }

  bindData():void{
    if (this.familyProfileObj){
      this.profileForm.patchValue({
        dateOfBirth: this.familyProfileObj.dateOfBirth,
        height: this.familyProfileObj.height,
        weight: this.familyProfileObj.weight,
        genderId: this.familyProfileObj.genderId,
        maritalStatusId: this.familyProfileObj.maritalStatusId,
        gotraId: this.familyProfileObj.gotraId,
        raasiId: this.familyProfileObj.raasiId,
        isMaglik: this.familyProfileObj.isMaglik,
        description: this.familyProfileObj.description,
        hobbies: this.familyProfileObj.hobbies,
        monthlyIncome: this.familyProfileObj.monthlyIncome
      });
      this.hobbiesArray = this.familyProfileObj.hobbies && this.familyProfileObj.hobbies.length > 0 ? <any>this.familyProfileObj.hobbies : [];
    }
  }

  get formControl() {
    return this.formGroup.controls;
  }

  async loadMasterData(): Promise<void> {
    const payload = {};

    const res: ResponseDataModel = await this.httpService.getRequest(ApiUrlEnum.FAMILY_MASTER, payload, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.genderList = JsonUtil.getDropdownList(res.data.gender);
          this.gotraList = JsonUtil.getDropdownList(res.data.gotra);
          this.educationList = JsonUtil.getDropdownList(res.data.education);
          this.maritalStatusList = JsonUtil.getDropdownList(res.data.maritalStatus);
          this.raasiList = JsonUtil.getDropdownList(res.data.raasi);
          break;
        case ServerResponseEnum.WARNING:
          break;
        case ServerResponseEnum.ERROR:
          this.snackBarService.showError(res.message);
          break;
      }
    }
  }
}
