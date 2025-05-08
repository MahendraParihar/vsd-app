import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Editor, toDoc, toHTML, Toolbar } from 'ngx-editor';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UiAddressFormComponent, UiMemberPostComponent, ValidationUtil } from '@vsd-frontend/shared-ui-lib';
import { AddressService, LabelService, NavigationService, SnackBarService, TOOLBAR } from '@vsd-frontend/core-lib';
import { Title } from '@angular/platform-browser';
import { EventService } from '../event.service';
import {
  FileTypeEnum,
  IAddressMaster,
  ICommonSEO,
  IEventAgenda,
  IEventAgendaDetail,
  IManageEvent,
  InputLength,
  LabelKey,
  MediaForEnum,
} from '@vsd-common/lib';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'event-lib-manage-event',
  templateUrl: './manage-event.component.html',
  standalone: false,
  providers:[provideNativeDateAdapter()],
  styleUrl: './manage-event.component.scss',
})
export class ManageEventComponent implements OnInit, OnDestroy {
  labelKeys = LabelKey;
  @Input() id!: number;
  pageTitle!: string;
  addressMaster!: IAddressMaster;
  fileTypeEnum = FileTypeEnum;
  mediaForEnum = MediaForEnum;
  inputLength = InputLength;
  event!: IManageEvent;
  seoData!: ICommonSEO;
  editor!: Editor;
  toolbar: Toolbar = TOOLBAR;

  formGroup: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required, Validators.maxLength(InputLength.CHAR_100)]),
    description: new FormControl(null),
    date: new FormControl(null, [Validators.required]),
    time: new FormControl(null, [Validators.required]),
    agenda: new FormArray([]),
  });

  @ViewChild(UiAddressFormComponent) addressComponent!: UiAddressFormComponent;
  @ViewChild(UiMemberPostComponent) memberPostComponent!: UiMemberPostComponent;

  constructor(
    private eventService: EventService,
    public labelService: LabelService,
    private title: Title,
    private addressService: AddressService,
    private snackBarService: SnackBarService,
    private navigation: NavigationService,
  ) {
    this.pageTitle = this.labelService.getLabel(this.id ? this.labelKeys.EDIT_EVENT : this.labelKeys.ADD_EVENT);
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
    if (!this.id) {
      this.addAgendaDay(null);
      return;
    }
    this.event = await this.eventService.loadDetails(this.id);
    this.bindData();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  bindData() {
    if (!this.event) {
      return;
    }
    this.formGroup.patchValue({
      title: this.event.title,
      description: toDoc(this.event.description),
      time: this.event.time,
      date: this.event.date,
    });
    this.bindAgenda();
    if (this.event.address) {
      this.addressComponent.address = this.event.address;
    }
    if (this.event.members && this.event.members.length > 0) {
      this.memberPostComponent.membersPost = this.event.members;
    }
    this.seoData = {
      tags: this.event.tags ? this.event.tags : [],
      metaTitle: this.event.metaTitle,
      metaDescription: this.event.metaDescription,
      url: this.event.url,
    };
  }

  onCancel() {
    this.navigation.back();
  }

  async updateDetails() {
    ValidationUtil.validateAllFormFields(this.formGroup);
    console.log(this.formGroup);
    if (!this.formGroup.valid) {
      return;
    }
    const payload: IManageEvent = {
      title: this.formGroup.value.title,
      description: toHTML(this.formGroup.value.description),
      date: this.formGroup.value.date,
      time: this.formGroup.value.time,
      imagePath: this.formGroup.value.uploadFiles,
      address: this.formGroup.value.address,
      agenda: this.formGroup.value.agenda,
      members: this.formGroup.value.membersPost.membersPost,
      ...this.formGroup.value.seo,
    };
    if (this.formGroup.value.address.addressId) {
      payload.addressId = this.formGroup.value.address.addressId;
    }
    if (this.id) {
      payload.eventId = Number(this.id);
    }
    try {
      await this.eventService.manageEvent(payload);
      this.snackBarService.showSuccess(
        this.labelService.getLabel(this.id ? this.labelKeys.SUCCESS_DATA_UPDATED : this.labelKeys.SUCCESS_DATA_ADDED),
      );
      this.onCancel();
    } catch (e) {
      this.snackBarService.showError(this.labelService.getLabel(this.labelKeys.ERROR_SOMETHING_WENT_WRONG));
    }
  }

  // region Event Agenda Day
  bindAgenda() {
    if (!this.event.agenda || this.event.agenda.length === 0) {
      return;
    }
    for (let i = 0; i < this.event.agenda.length; i++) {
      this.addAgendaDay(this.event.agenda[0]);
      this.bindAgendaDetails(i);
    }
  }

  agendaDayFormGroup(obj: IEventAgenda | null): FormGroup {
    return new FormGroup({
      date: new FormControl(obj ? obj.date : null, [Validators.required]),
      details: new FormArray([]),
    });
  }

  get agendaDayFormArray() {
    return this.formGroup.get('agenda') as FormArray;
  }

  addAgendaDay(obj: IEventAgenda | null) {
    this.agendaDayFormArray.push(this.agendaDayFormGroup(obj));
    if (!obj || !obj.details || obj.details.length === 0) {
      this.addAgendaDayDetails(this.agendaDayFormArray.length - 1, null);
    }
  }

  removeAgendaDay(index: number) {
    this.agendaDayFormArray.removeAt(index);
  }

  // endregion

  // region Event Agenda Day
  bindAgendaDetails(index: number) {
    if (!this.event.agenda[index].details || this.event.agenda[index].details.length === 0) {
      return;
    }
    for (const s of this.event.agenda[index].details) {
      this.addAgendaDayDetails(index, s);
    }
  }

  agendaDayDetailsFormGroup(obj: IEventAgendaDetail | null): FormGroup {
    return new FormGroup({
      title: new FormControl(obj ? obj.title : null, [Validators.required, Validators.maxLength(InputLength.CHAR_100)]),
      details: new FormControl(obj ? obj.details : null, [
        Validators.required,
        Validators.maxLength(InputLength.CHAR_200),
      ]),
      time: new FormControl(obj ? obj.time : null, [Validators.required]),
    });
  }

  getAgendaDayDetailsFormArray(index: number) {
    return this.agendaDayFormArray.at(index).get('details') as FormArray;
  }

  addAgendaDayDetails(index: number, obj: IEventAgendaDetail | null) {
    this.getAgendaDayDetailsFormArray(index).push(this.agendaDayDetailsFormGroup(obj));
  }

  removeAgendaDayDetails(index: number, detailIndex: number) {
    this.getAgendaDayDetailsFormArray(index).removeAt(detailIndex);
  }

  // endregion
}
