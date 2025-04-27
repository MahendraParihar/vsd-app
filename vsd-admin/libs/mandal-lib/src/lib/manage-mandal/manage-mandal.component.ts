import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MandalService } from '../mandal.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService, LabelService, NavigationService, SnackBarService, TOOLBAR } from '@vsd-frontend/core-lib';
import {
  FileTypeEnum,
  IAddressMaster,
  ICommonSEO,
  IManageMandal,
  InputLength,
  LabelKey,
  MediaForEnum,
} from '@vsd-common/lib';
import { Title } from '@angular/platform-browser';
import {
  UiAddressFormComponent, UiMemberPostComponent,
  UiSeoFormComponent,
  UiSocialLinkFormComponent,
  ValidationUtil,
} from '@vsd-frontend/shared-ui-lib';
import { Editor, toDoc, toHTML, Toolbar } from 'ngx-editor';

@Component({
  selector: 'mandal-lib-manage-mandal',
  templateUrl: './manage-mandal.component.html',
  standalone: false,
  styleUrl: './manage-mandal.component.scss',
})
export class ManageMandalComponent implements OnInit, OnDestroy {

  inputLength = InputLength;
  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  addressMaster!: IAddressMaster;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  mandal!: IManageMandal;
  seoData!: ICommonSEO;
  editor!: Editor;
  toolbar: Toolbar = TOOLBAR;

  formGroup: FormGroup = new FormGroup({
    mandalName: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_150)]),
    description: new FormControl(null),
    regNo: new FormControl(null),
    emailId: new FormControl(null, [Validators.email, Validators.pattern(ValidationUtil.EMAIL_REGEX), Validators.maxLength(InputLength.MAX_EMAIL)]),
    phoneNumber: new FormControl(null, [Validators.maxLength(InputLength.MAX_CONTACT_NUMBER)]),
  });

  @ViewChild(UiAddressFormComponent) addressComponent!: UiAddressFormComponent;
  @ViewChild(UiSeoFormComponent) seoComponents!: UiSeoFormComponent;
  @ViewChild(UiSocialLinkFormComponent) socialLinkComponents!: UiSocialLinkFormComponent;
  @ViewChild(UiMemberPostComponent) memberPostComponent!: UiMemberPostComponent;

  constructor( private mandalService: MandalService,
              public labelService: LabelService, private title: Title,
              private addressService: AddressService,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {


    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_MANDAL : this.labelKeys.ADD_MANDAL);
    this.title.setTitle(this.pageTitle);
  }

  async ngOnInit() {
    this.editor = new Editor();
    this.addressMaster = await this.addressService.loadAddressMasterData();
    await this.loadDetail();
  }

  async loadDetail() {
    if (!this.id) {
      return;
    }
    this.mandal = await this.mandalService.loadDetails(this.id);
    this.bindData();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  bindData() {
    if (!this.mandal) {
      return;
    }
    this.formGroup.patchValue({
      mandalName: this.mandal.mandalName,
      description: toDoc(this.mandal.description),
    });
    if (this.mandal.address) {
      this.addressComponent.address = this.mandal.address;
    }
    if (this.mandal.members && this.mandal.members.length > 0) {
      this.memberPostComponent.membersPost = this.mandal.members
    }
    if (this.mandal.additionalInfo) {
      this.formGroup.patchValue({
        emailId: this.mandal.additionalInfo.emailId,
        phoneNumber: this.mandal.additionalInfo.phoneNumber,
        regNo: this.mandal.additionalInfo.regNo,
      });
    }
    this.seoData = {
      tags: this.mandal.tags ? this.mandal.tags : [],
      metaTitle: this.mandal.metaTitle,
      metaDescription: this.mandal.metaDescription,
      url: this.mandal.url,
    };
  }

  onCancel() {
    this.navigation.back();
  }

  async updateDetails() {
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }
    const payload: IManageMandal = {
      mandalName: this.formGroup.value.mandalName,
      description: toHTML(this.formGroup.value.description),
      imagePath: this.formGroup.value.uploadFiles,
      address: this.formGroup.value.address,
      members: this.formGroup.value.membersPost.membersPost,
      ...this.formGroup.value.seo,
      additionalInfo: {
        emailId: this.formGroup.value.emailId,
        phoneNumber: this.formGroup.value.phoneNumber,
        regNo: this.formGroup.value.regNo,
        socialSiteLink: this.formGroup.value.socialSiteLink.socialSiteLink,
      },
    };
    if (this.formGroup.value.address.addressId) {
      payload.addressId = this.formGroup.value.address.addressId;
    }
    if (this.id) {
      payload.mandalId = Number(this.id);
    }
    try {
      await this.mandalService.manageMandal(payload);
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }

  get socialLinks() {
    return this.formGroup.get('socialSiteLink') as FormArray;
  }

  addSocialLink() {
    this.socialLinks.push(new FormGroup({
      label: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
      link: new FormControl(null),
      icon: new FormControl(null),
    }));
  }
}
