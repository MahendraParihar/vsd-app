import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LabelService, NavigationService, SnackBarService } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { FileTypeEnum, IManageMatrimonialStatus, InputLength, LabelKey, MediaForEnum } from '@vsd-common/lib';
import { MatrimonialStatusService } from '../matrimonial-status.service';

@Component({
  selector: 'lib-manage-matrimonial-status',
  templateUrl: './manage-matrimonial-status.component.html',
  standalone: false,
  styleUrl: './manage-matrimonial-status.component.scss',
})
export class ManageMatrimonialStatusComponent implements OnInit {

  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  lovModel!: IManageMatrimonialStatus;

  formGroup: FormGroup = new FormGroup({
    matrimonialStatus: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_50)]),
  });

  constructor( private service: MatrimonialStatusService,
              public labelService: LabelService, private title: Title,
              private snackBarService: SnackBarService,
              private navigation: NavigationService) {

    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_MATRIMONIAL_STATUS : this.labelKeys.ADD_MATRIMONIAL_STATUS);
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
      matrimonialStatus: this.lovModel.matrimonialStatus,
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
    const payload: IManageMatrimonialStatus = {
      matrimonialStatus: this.formGroup.value.matrimonialStatus,
      imagePath: this.formGroup.value.uploadFiles,
    };
    if (this.id) {
      payload.matrimonialStatusId = this.id;
    }
    try {
      await this.service.manageMatrimonialStatus(payload);
      this.snackBarService.showSuccess(this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED));
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }
}
