import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ResponseDataModel} from "../../../models/response-data.model";
import {ValidationUtil} from "../../../utilites/validation-util";
import {ServerResponseEnum} from "../../../enum/server-response-enum";
import {ApiUrlEnum} from "../../../enum/api-url-enum";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {HttpService} from "../../../service/http.service";
import {SnackBarService} from "../../../service/snack-bar.service";
import {NavigationService} from "../../../service/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {StringResources} from "../../../enum/string-resources";
import {CurrentAffairModel} from "../../../models/current-affair.model";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {Constants} from "../../../constants/Constants";
import {FileTypeEnum} from "../../../enum/file-type-enum";
import {MediaForEnum} from "../../../enum/media-for-enum";
import {InputLength} from "../../../constants/input-length";

@Component({
  selector: 'app-current-affair-manage',
  templateUrl: './current-affair-manage.component.html',
  styleUrls: ['./current-affair-manage.component.scss']
})
export class CurrentAffairManageComponent implements OnInit, AfterViewInit, OnDestroy {

  currentAffairObj: CurrentAffairModel;
  id: number;
  stringRes = StringResources;
  editorConfig: AngularEditorConfig = Constants.editorConfig;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  inputLength = InputLength;

  maxDate = new Date();
  minDate = new Date(this.maxDate.getFullYear() - 1, this.maxDate.getMonth(), this.maxDate.getDay()+2);

  formGroup: UntypedFormGroup = this.fb.group({
    title: [null, [Validators.required, Validators.minLength(this.inputLength.CHAR_5), Validators.maxLength(this.inputLength.CHAR_100)]],
    description: [null, [Validators.required]],
    date: [null, [Validators.required]],
    time: [null, [Validators.required]],
    commentsAllow: [null, [Validators.required]],
    source: [null, [Validators.minLength(this.inputLength.CHAR_5), Validators.maxLength(this.inputLength.CHAR_200)]]
  });

  constructor(private httpService: HttpService,
              private snackBarService: SnackBarService,
              private navigationService: NavigationService,
              private activatedRoute: ActivatedRoute,
              private fb: UntypedFormBuilder) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  get formControl() {
    return this.formGroup.controls;
  }

  async ngOnInit(): Promise<void> {
    if (this.id) {
      await this.loadDataById(this.id);
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  onCancel(): void {
    this.navigationService.back();
  }

  bindData(): void {
    if (this.currentAffairObj) {
      this.formGroup.patchValue({
        title: this.currentAffairObj.title,
        description: this.currentAffairObj.description,
        date: this.currentAffairObj.date,
        time: this.currentAffairObj.time,
        commentsAllow: this.currentAffairObj.commentsAllow,
        source: this.currentAffairObj.source
      });
    }
  }

  async loadDataById(id: number): Promise<void> {
    const payload = {
      id: id
    };

    const res: ResponseDataModel = await this.httpService.getRequest(ApiUrlEnum.CURRENT_AFFAIR, payload, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.currentAffairObj = CurrentAffairModel.fromJson(res.data);
          this.bindData();
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

  async onSubmit(): Promise<void> {
    ValidationUtil.validateAllFormFields(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }

    let payload: any = this.formGroup.value;

    let res: ResponseDataModel;
    if (this.id > 0) {
      res = await this.httpService.patchRequest(ApiUrlEnum.CURRENT_AFFAIR, this.id, payload, true);
    } else {
      res = await this.httpService.postRequest(ApiUrlEnum.CURRENT_AFFAIR, payload, true);
    }
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.snackBarService.showSuccess(res.message);
          this.navigationService.back();
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
