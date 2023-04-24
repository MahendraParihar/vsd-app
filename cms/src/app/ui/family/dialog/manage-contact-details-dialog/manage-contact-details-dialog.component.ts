import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FamilyContactNumberModel} from "../../../../models/family.model";
import {ResponseDataModel} from "../../../../models/response-data.model";
import {ApiUrlEnum} from "../../../../enum/api-url-enum";
import {ServerResponseEnum} from "../../../../enum/server-response-enum";
import {HttpService} from "../../../../service/http.service";
import {SnackBarService} from "../../../../service/snack-bar.service";
import {DropdownItem} from "../../../../interfaces/dropdown-item";
import {StringResources} from "../../../../enum/string-resources";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InputLength} from "../../../../constants/input-length";

@Component({
  selector: 'app-manage-contact-details-dialog',
  templateUrl: './manage-contact-details-dialog.component.html',
  styleUrls: ['./manage-contact-details-dialog.component.scss']
})
export class ManageContactDetailsDialogComponent implements OnInit {

  familyId: number;
  contactNumberObj: FamilyContactNumberModel;
  isAdd: true;
  stringRes = StringResources;
  inputLength = InputLength;

  countryList: DropdownItem[] = [];
  contactTypeList: DropdownItem[] = [];

  formGroup: FormGroup = this.fb.group({
    countryCode: [null, [Validators.required]],
    contactTypeId: [null, [Validators.required]],
    contactNumber: [null, [Validators.required, Validators.maxLength(InputLength.MAX_CONTACT_NUMBER)]]
  });

  constructor(public dialogRef: MatDialogRef<ManageContactDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private httpService: HttpService,
              private snackBarService: SnackBarService,
              private fb: FormBuilder) {
    this.familyId = data.familyId;
    this.contactNumberObj = data.contactDetail;
    this.isAdd = data.isAdd;
  }

  async ngOnInit(): Promise<void> {
    await this.loadContactTypeTask();
    this.bindData();
  }

  get formControl() {
    return this.formGroup.controls;
  }

  bindData(): void {
    if (this.contactNumberObj) {
      this.formGroup.patchValue({
        contactTypeId: this.contactNumberObj.contactTypeId,
        contactNumber: this.contactNumberObj.contactNumber,
        countryCode: this.contactNumberObj.countryCode
      });
    }
  }

  onPositiveClick(): void {
    this.closeDialog(true);
  }

  onNegativeClick(): void {
    this.closeDialog(false);
  }

  closeDialog(flag: boolean) {
    this.dialogRef.close(flag);
  }

  async loadContactTypeTask(): Promise<void> {
    const res: ResponseDataModel = await this.httpService.getRequest(ApiUrlEnum.CONTACT_NUMBER_MASTER, null, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          const tempCountry = res.data.country;
          const tempContactType = res.data.contactType;
          this.countryList = [];
          this.contactTypeList = [];
          for (const s of tempCountry) {
            this.countryList.push(<DropdownItem>{
              id: s.id,
              name: s.name,
              isSelected: s.selected,
            });
          }
          for (const s of tempContactType) {
            this.contactTypeList.push(<DropdownItem>{
              id: s.id,
              name: s.name,
              isSelected: s.selected,
            });
          }
          break;
        case ServerResponseEnum.WARNING:
          this.snackBarService.showWarning(res.message);
          break;
        case ServerResponseEnum.ERROR:
          this.snackBarService.showError(res.message);
          break;
      }
    }
  }

  async manageContactNumberTask(): Promise<void> {
    if (!this.formGroup.valid) {
      return;
    }
    const payload = {...this.formGroup.value, familyId: this.familyId};

    let res: ResponseDataModel;
    if (this.isAdd) {
      res = await this.httpService.postRequest(ApiUrlEnum.FAMILY_CONTACT_NUMBER, payload, true);
    } else {
      res = await this.httpService.patchRequest(ApiUrlEnum.FAMILY_CONTACT_NUMBER, this.contactNumberObj.id ,payload, true);
    }
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.snackBarService.showSuccess(res.message);
          this.closeDialog(true);
          break;
        case ServerResponseEnum.WARNING:
          this.snackBarService.showWarning(res.message);
          break;
        case ServerResponseEnum.ERROR:
          this.snackBarService.showError(res.message);
          break;
      }
    }
  }

}
