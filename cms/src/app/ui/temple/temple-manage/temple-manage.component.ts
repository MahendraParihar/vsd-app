import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {StringResources} from "../../../enum/string-resources";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SnackBarService} from "../../../service/snack-bar.service";
import {NavigationService} from "../../../service/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../service/http.service";
import {ValidationUtil} from "../../../utilites/validation-util";
import {ResponseDataModel} from "../../../models/response-data.model";
import {ApiUrlEnum} from "../../../enum/api-url-enum";
import {ServerResponseEnum} from "../../../enum/server-response-enum";
import {TempleModel} from "../../../models/temple.model";
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {Constants} from "../../../constants/Constants";
import {FileTypeEnum} from "../../../enum/file-type-enum";
import {MediaForEnum} from "../../../enum/media-for-enum";
import {InputLength} from "../../../constants/input-length";

@Component({
  selector: 'app-temple-manage',
  templateUrl: './temple-manage.component.html',
  styleUrls: ['./temple-manage.component.scss']
})
export class TempleManageComponent implements OnInit, AfterViewInit, OnDestroy {

  templeObj: TempleModel;
  id: number;
  stringRes = StringResources;
  editorConfig: AngularEditorConfig = Constants.editorConfig;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  inputLength = InputLength;

  formGroup: UntypedFormGroup = this.fb.group({
    templeName: [null, [Validators.required, Validators.minLength(this.inputLength.CHAR_5), Validators.maxLength(this.inputLength.CHAR_100)]],
    description: [null, [Validators.required]]
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
    if (this.templeObj) {
      this.formGroup.patchValue({
        templeName:this.templeObj.name,
        description:this.templeObj.description
      });
    }
  }

  async loadDataById(id: number): Promise<void> {
    const payload = {
      id: id
    };
    const res: ResponseDataModel = await this.httpService.getRequest(ApiUrlEnum.TEMPLE_MANAGE, payload, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.templeObj = TempleModel.fromJson(res.data);
          console.log(this.templeObj);
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
      res = await this.httpService.patchRequest(ApiUrlEnum.TEMPLE_MANAGE, this.id, payload, true);
    } else {
      res = await this.httpService.postRequest(ApiUrlEnum.TEMPLE_MANAGE, payload, true);
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
