import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Editor, Toolbar } from 'ngx-editor';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UiAddressFormComponent, ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { ActivatedRoute } from '@angular/router';
import { AddressService, LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { FileTypeEnum, IAddressMaster, IManageTemple, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { TempleService } from '../temple.service';

@Component({
  selector: 'lib-manage-temple',
  templateUrl: './manage-temple.component.html',
  styleUrl: './manage-temple.component.scss',
})
export class ManageTempleComponent implements OnInit, OnDestroy {

  labelKeys = LabelKey;
  id!: number;
  pageTitle!: string;
  addressMaster!: IAddressMaster;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  temple!: IManageTemple;
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
    templeName: new FormControl(null, [Validators.required, Validators.maxLength(150)]),
    description: new FormControl(null),
  });

  @ViewChild(UiAddressFormComponent) addressComponent!: UiAddressFormComponent;

  constructor(private activatedRoute: ActivatedRoute, private templeService: TempleService,
              public labelService: LabelService, private title: Title,
              private addressService: AddressService,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {
    console.log(this.activatedRoute.snapshot);
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
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
      description: this.temple.description,
    });
    if (this.temple.address) {
      this.addressComponent.address = this.temple.address;
    }
  }

  onCancel() {
    this.navigation.back();
  }

  async updateDetails() {
    console.log(this.formGroup);
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }
    const payload: IManageTemple = {
      templeName: this.formGroup.value.templeName,
      description: this.formGroup.value.description,
      imagePath: this.formGroup.value.uploadFiles,
      address: this.formGroup.value.address,
    };
    if (this.formGroup.value.address.addressId) {
      payload.addressId = this.formGroup.value.address.addressId;
    }
    if (this.id) {
      payload.templeId = this.id;
    }
    try {
      await this.templeService.manageTemple(payload);
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
