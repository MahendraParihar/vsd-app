import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { FileTypeEnum, IManageRaasi, InputLength, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { RaasiService } from '../raasi.service';

@Component({
  selector: 'lovs-lib-manage-raasi',
  templateUrl: './manage-raasi.component.html',
  standalone: false,
  styleUrl: './manage-raasi.component.scss',
})
export class ManageRaasiComponent implements OnInit {

  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  lovModel!: IManageRaasi;

  formGroup: FormGroup = new FormGroup({
    raasi: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_50)]),
  });

  constructor( private service: RaasiService,
              public labelService: LabelService, private title: Title,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {

    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_RAASI : this.labelKeys.ADD_RAASI);
    this.title.setTitle(this.pageTitle);
  }

  async ngOnInit() {
    await this.loadDetail();
  }

  async loadDetail() {
    if (!this.id) {
      return;
    }
    this.lovModel = await this.service.loadDetails(this.id);
    this.bindData();
  }

  bindData() {
    if (!this.lovModel) {
      return;
    }
    this.formGroup.patchValue({
      raasi: this.lovModel.raasi,
    });
  }

  onCancel() {
    this.navigation.back();
  }

  async updateDetails() {
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }
    const payload: IManageRaasi = {
      raasi: this.formGroup.value.raasi,
      imagePath: this.formGroup.value.uploadFiles,
    };
    if (this.id) {
      payload.raasiId = Number(this.id);
    }
    try {
      await this.service.manageRaasi(payload);
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
