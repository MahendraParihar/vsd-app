import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Editor, toDoc, toHTML, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiAddressFormComponent, ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { AddressService, LabelService, NavigationService, SnackBarService, TOOLBAR } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { FileTypeEnum, IAddressMaster, ICommonSEO, IManageTemple, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { TempleService } from '../temple.service';

@Component({
  selector: 'temple-lib-manage-temple',
  templateUrl: './manage-temple.component.html',
  standalone: false,
  styleUrl: './manage-temple.component.scss',
})
export class ManageTempleComponent implements OnInit, OnDestroy {
  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  addressMaster!: IAddressMaster;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  temple!: IManageTemple;
  seoData!: ICommonSEO;
  editor!: Editor;
  toolbar: Toolbar = TOOLBAR;

  formGroup: FormGroup = new FormGroup({
    templeName: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
    description: new FormControl(null),
  });

  @ViewChild(UiAddressFormComponent) addressComponent!: UiAddressFormComponent;

  constructor(
    private templeService: TempleService,
    public labelService: LabelService,
    private title: Title,
    private addressService: AddressService,
    private snackBarService: SnackBarService,
    private navigation: NavigationService,
  ) {
    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_TEMPLE : this.labelKeys.ADD_TEMPLE);
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
    this.temple = await this.templeService.loadDetails(this.id);
    this.bindData();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  bindData() {
    if (!this.temple) {
      return;
    }
    this.formGroup.patchValue({
      templeName: this.temple.templeName,
      description: toDoc(this.temple.description),
    });
    if (this.temple.address) {
      this.addressComponent.address = this.temple.address;
    }
    this.seoData = {
      tags: this.temple.tags ? this.temple.tags : [],
      metaTitle: this.temple.metaTitle,
      metaDescription: this.temple.metaDescription,
      url: this.temple.url,
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
    const payload: IManageTemple = {
      templeName: this.formGroup.value.templeName,
      description: toHTML(this.formGroup.value.description),
      imagePath: this.formGroup.value.uploadFiles,
      address: this.formGroup.value.address,
      ...this.formGroup.value.seo,
    };
    if (this.formGroup.value.address.addressId) {
      payload.addressId = this.formGroup.value.address.addressId;
    }
    if (this.id) {
      payload.templeId = this.id;
    }
    try {
      await this.templeService.manageTemple(payload);
      this.snackBarService.showSuccess(
        this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED),
      );
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
