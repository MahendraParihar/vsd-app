import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {StringResources} from "../../../enum/string-resources";
import {FormArray, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SnackBarService} from "../../../service/snack-bar.service";
import {NavigationService} from "../../../service/navigation.service";
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../service/http.service";
import {ValidationUtil} from "../../../utilites/validation-util";
import {ResponseDataModel} from "../../../models/response-data.model";
import {ApiUrlEnum} from "../../../enum/api-url-enum";
import {ServerResponseEnum} from "../../../enum/server-response-enum";
import {EventAgendaDetailModel, EventAgendaModel, EventModel} from "../../../models/event.model";
import {InputLength} from "../../../constants/input-length";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {Constants} from "../../../constants/Constants";
import {FileTypeEnum} from "../../../enum/file-type-enum";
import {MediaForEnum} from "../../../enum/media-for-enum";
import {UserDropdownItem} from "../../../interfaces/dropdown-item";
import 'lodash';

declare var _: any;

@Component({
  selector: 'app-event-manage',
  templateUrl: './event-manage.component.html',
  styleUrls: ['./event-manage.component.scss']
})
export class EventManageComponent implements OnInit, AfterViewInit, OnDestroy {

  eventObj: EventModel;
  id: number;
  stringRes = StringResources;
  inputLength = InputLength;
  editorConfig: AngularEditorConfig = Constants.editorConfig;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;

  formGroup: UntypedFormGroup = this.fb.group({
    title: [null, [Validators.required, Validators.minLength(InputLength.CHAR_5), Validators.maxLength(InputLength.CHAR_100)]],
    description: [null, [Validators.required]],
    date: [null, [Validators.required]],
    time: [null, [Validators.required]],
    agenda: this.fb.array([])
  });

  minDate = new Date();
  maxDate = new Date(this.minDate.getFullYear() + 1, this.minDate.getMonth()+2, this.minDate.getDay()-1);

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
    } else {
      this.addAgenda(null);
    }
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  onCoordinatorChange(event: UserDropdownItem[]): void {
    if (event && event.length > 0) {
      this.formGroup.patchValue({
        coordinator: _.map(event, 'id').join(',')
      });
    } else {
      this.formGroup.patchValue({
        coordinator: null
      });
    }
  }

  onCancel(): void {
    this.navigationService.back();
  }

  // region agenda
  agendaArray(): FormArray {
    return this.formGroup.get("agenda") as FormArray
  }

  newAgenda(agendaObj: EventAgendaModel): FormGroup {
    return this.fb.group({
      agendaDate: [agendaObj ? agendaObj.agendaDate : null, [Validators.required]],
      agendaDetail: this.fb.array([]),
    });
  }

  addAgenda(agendaObj: EventAgendaModel) {
    this.agendaArray().push(this.newAgenda(agendaObj));
    const idx = this.agendaArray().length;
    this.addAgendaDetail(idx - 1, agendaObj ? agendaObj.agendaDetail : []);
  }

  removeAgenda(i: number) {
    this.agendaArray().removeAt(i);
  }

  // endregion

  // region agenda detail
  agendaDetailArray(index: number): FormArray {
    return this.agendaArray().at(index).get("agendaDetail") as FormArray
  }

  newAgendaDetail(agendaDetailObj: EventAgendaDetailModel): FormGroup {
    return this.fb.group({
      startTime: [agendaDetailObj ? agendaDetailObj.startTime : null, [Validators.required]],
      endTime: [agendaDetailObj ? agendaDetailObj.endTime : null, []],
      desc: [agendaDetailObj ? agendaDetailObj.desc : null, [Validators.required, Validators.minLength(InputLength.CHAR_5), Validators.maxLength(InputLength.CHAR_500)]]
    })
  }

  addAgendaDetail(index: number, agendaDetailObjList: EventAgendaDetailModel[]) {
    if (agendaDetailObjList && agendaDetailObjList.length > 0) {
      for (const s of agendaDetailObjList) {
        this.agendaDetailArray(index).push(this.newAgendaDetail(s));
      }
    } else {
      this.agendaDetailArray(index).push(this.newAgendaDetail(null));
    }

  }

  removeAgendaDetail(index: number, dIndex: number) {
    this.agendaDetailArray(index).removeAt(dIndex);
  }

  // endregion

  bindData(): void {
    if (this.eventObj) {
      this.formGroup.patchValue({
        title: this.eventObj.title,
        description: this.eventObj.description,
        date: this.eventObj.date,
        time: this.eventObj.time,
        agenda: this.eventObj.agenda,
      });
      for (const a of this.eventObj.agenda) {
        this.addAgenda(a);
      }
      this.onCoordinatorChange(this.eventObj.eventCoordinators);
    }
  }

  async loadDataById(id: number): Promise<void> {
    const payload = {
      id: id
    };

    const res: ResponseDataModel = await this.httpService.getRequest(ApiUrlEnum.EVENT, payload, true);
    if (res) {
      switch (res.code) {
        case ServerResponseEnum.SUCCESS:
          this.eventObj = EventModel.fromJson(res.data);
          this.bindData();
          break;
        case ServerResponseEnum.WARNING:
          this.snackBarService.showError(res.message);
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
      res = await this.httpService.patchRequest(ApiUrlEnum.EVENT, this.id, payload, true);
    } else {
      res = await this.httpService.postRequest(ApiUrlEnum.EVENT, payload, true);
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
