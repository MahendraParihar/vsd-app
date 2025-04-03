import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Editor, toDoc, toHTML, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiAddressFormComponent, UiMemberPostComponent, ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { ActivatedRoute } from '@angular/router';
import { AddressService, LabelService, NavigationService, SnackBarService, TOOLBAR } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { FacilityService } from '../facility.service';
import {
  FileTypeEnum,
  IAddressMaster,
  ICommonSEO,
  IManageFacility,
  InputLength,
  LabelKey,
  MediaForEnum,
} from '@vsd-common/lib';

@Component({
  selector: 'facility-lib-manage-facility',
  standalone: false,
  templateUrl: './manage-facility.component.html',
  styleUrl: './manage-facility.component.scss',
})
export class ManageFacilityComponent implements OnInit, OnDestroy {

  labelKeys = LabelKey;
  id!: number;
  pageTitle!: string;
  addressMaster!: IAddressMaster;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  inputLength = InputLength;
  facility!: IManageFacility;
  seoData!: ICommonSEO;
  editor!: Editor;
  toolbar: Toolbar = TOOLBAR;

  formGroup: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_100)]),
    description: new FormControl(null),
  });

  @ViewChild(UiAddressFormComponent) addressComponent!: UiAddressFormComponent;
  @ViewChild(UiMemberPostComponent) memberPostComponent!: UiMemberPostComponent;

  constructor(private activatedRoute: ActivatedRoute, private facilityService: FacilityService,
              public labelService: LabelService, private title: Title,
              private addressService: AddressService,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_FACILITY : this.labelKeys.ADD_FACILITY);
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
    if (!this.id){
      return;
    }
    this.facility = await this.facilityService.loadDetails(this.id);
    this.bindData();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  bindData() {
    if (!this.facility) {
      return;
    }
    this.formGroup.patchValue({
      title: this.facility.title,
      description: toDoc(this.facility.description),
    });
    if (this.facility.address) {
      this.addressComponent.address = this.facility.address;
    }
    if (this.facility.members && this.facility.members.length > 0) {
      this.memberPostComponent.membersPost = this.facility.members
    }
    this.seoData = {
      tags: this.facility.tags ? this.facility.tags : [],
      metaTitle: this.facility.metaTitle,
      metaDescription: this.facility.metaDescription,
      url: this.facility.url,
    };
  }

  onCancel() {
    this.navigation.back();
  }

  async updateDetails() {
    console.log(this.formGroup);
    console.log(this.formGroup.value);
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }
    const payload: IManageFacility = {
      title: this.formGroup.value.title,
      description: toHTML(this.formGroup.value.description),
      imagePath: this.formGroup.value.uploadFiles,
      address: this.formGroup.value.address,
      members: this.formGroup.value.membersPost.membersPost,
      ...this.formGroup.value.seo,
    };
    if (this.formGroup.value.address.addressId) {
      payload.addressId = this.formGroup.value.address.addressId;
    }
    if (this.id) {
      payload.facilityId = this.id;
    }
    try {
      await this.facilityService.manageFacility(payload);
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
