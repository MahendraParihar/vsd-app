import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { AddressService, LabelService, NavigationService, SnackBarService, TOOLBAR } from '@vsd-frontend/core-lib';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiAddressFormComponent, UiMemberPostComponent, ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { Title } from '@angular/platform-browser';
import { FileTypeEnum, IAddressMaster, IManageFamily, InputLength, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { FamilyService } from '../family.service';

@Component({
  selector: 'family-lib-manage-family',
  templateUrl: './manage-family.component.html',
  standalone: false,
  styleUrl: './manage-family.component.scss',
})
export class ManageFamilyComponent implements OnInit, OnDestroy {
  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  addressMaster!: IAddressMaster;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  inputLength = InputLength;
  family!: IManageFamily;
  editor!: Editor;
  toolbar: Toolbar = TOOLBAR;

  formGroup: FormGroup = new FormGroup({
    firstName: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_50)]),
    middleName: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_50)]),
    lastName: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_50)]),
    emailId: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(InputLength.CHAR_100)]),
  });

  @ViewChild(UiAddressFormComponent) addressComponent!: UiAddressFormComponent;
  @ViewChild(UiMemberPostComponent) memberPostComponent!: UiMemberPostComponent;

  constructor(
    private familyService: FamilyService,
    public labelService: LabelService,
    private title: Title,
    private addressService: AddressService,
    private snackBarService: SnackBarService,
    private navigation: NavigationService,
  ) {
    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_FAMILY : this.labelKeys.ADD_FAMILY);
    this.title.setTitle(this.pageTitle);
  }

  async ngOnInit() {
    this.editor = new Editor({
      content: '',
      history: true,
      keyboardShortcuts: true,
      inputRules: true,
    });
    this.addressMaster = await this.addressService.loadAddressMasterData();
    await this.loadDetail();
  }

  async loadDetail() {
    if (!this.id) {
      return;
    }
    this.family = await this.familyService.loadDetails(this.id);
    this.bindData();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  bindData() {
    if (!this.family) {
      return;
    }
    this.formGroup.patchValue({
      firstName: this.family.firstName,
      lastName: this.family.lastName,
      middleName: this.family.middleName,
      emailId: this.family.emailId,
    });
    if (this.family.address) {
      this.addressComponent.address = this.family.address;
    }
  }

  onCancel() {
    this.navigation.back();
  }

  async updateDetails() {
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }
    const payload: IManageFamily = {
      firstName: this.formGroup.value.firstName,
      lastName: this.formGroup.value.lastName,
      middleName: this.formGroup.value.middleName,
      emailId: this.formGroup.value.emailId,
      imagePath: this.formGroup.value.uploadFiles,
      address: this.formGroup.value.address,
    };
    if (this.formGroup.value.address.addressId) {
      payload.addressId = this.formGroup.value.address.addressId;
    }
    if (this.id) {
      payload.familyId = this.id;
    }
    try {
      await this.familyService.manageFamily(payload);
      this.snackBarService.showSuccess(
        this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED),
      );
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
