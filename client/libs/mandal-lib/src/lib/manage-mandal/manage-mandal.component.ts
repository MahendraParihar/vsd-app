import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MandalService } from '../mandal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService, LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { FileTypeEnum, IAddressMaster, ICommonSEO, IManageMandal, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { Title } from '@angular/platform-browser';
import { UiAddressFormComponent, ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { Editor, Toolbar } from 'ngx-editor';

@Component({
  selector: 'lib-manage-mandal',
  templateUrl: './manage-mandal.component.html',
  styleUrl: './manage-mandal.component.scss',
})
export class ManageMandalComponent implements OnInit, OnDestroy {

  labelKeys = LabelKey;
  id!: number;
  pageTitle!: string;
  addressMaster!: IAddressMaster;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  mandal!: IManageMandal;
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  formGroup: FormGroup = new FormGroup({
    mandalName: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
    description: new FormControl(null),
  });

  @ViewChild(UiAddressFormComponent) addressComponent!: UiAddressFormComponent;

  constructor(private activatedRoute: ActivatedRoute, private mandalService: MandalService,
              public labelService: LabelService, private title: Title,
              private addressService: AddressService,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {
    console.log(this.activatedRoute.snapshot);
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
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

  get SEOObj() {
    if (this.mandal) {
      return <ICommonSEO>{
        tags: this.mandal.tags ? this.mandal.tags : [],
        metaTitle: this.mandal.metaTitle,
        metaDescription: this.mandal.metaDescription,
        url: this.mandal.url,
      };
    }
    return <ICommonSEO>{};
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
      description: this.mandal.description,
    });
    if (this.mandal.address) {
      this.addressComponent.address = this.mandal.address;
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
    console.log(this.formGroup);
    const payload: IManageMandal = {
      mandalName: this.formGroup.value.mandalName,
      description: this.formGroup.value.description,
      imagePath: this.formGroup.value.uploadFiles,
      address: this.formGroup.value.address,
      ...this.formGroup.value.seo,
    };
    if (this.formGroup.value.address.addressId) {
      payload.addressId = this.formGroup.value.address.addressId;
    }
    if (this.id) {
      payload.mandalId = this.id;
    }
    try {
      await this.mandalService.manageMandal(payload);
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
