import {AddressModel} from "./address.model";
import {UserDropdownItem} from "../interfaces/dropdown-item";
import * as moment from "moment";
import {MediaUploadResponseModel} from "./media-upload-response.model";

export class EventModel {
  id: number;
  title: string;
  description: string;
  date: moment.Moment;
  time: moment.Moment;
  imagePath?: MediaUploadResponseModel[];
  active?: boolean;
  isPublished: boolean;
  createdAt?: moment.Moment;
  createdBy?: string;
  updatedAt: moment.Moment;
  updatedBy?: string;
  addressModel?: AddressModel;
  agenda?: EventAgendaModel[];
  eventCoordinators?: UserDropdownItem[];

  static fromJson(data: any): EventModel | null {
    if (!data) {
      return null;
    }
    const authUserObj: EventModel = new EventModel();
    authUserObj.id = data.eventId;
    authUserObj.title = data.title;
    authUserObj.description = data.description;
    authUserObj.date = data.date ? data.date : null;
    authUserObj.time = data.time ? data.time : null;
    authUserObj.imagePath = data.imagePath ? (Array.isArray(data.imagePath) ? data.imagePath : [data.imagePath]) : [];
    authUserObj.active = data.active;
    authUserObj.isPublished = data.isPublished;
    authUserObj.createdBy = data.createdBy;
    authUserObj.updatedBy = data.updatedBy;
    authUserObj.createdAt = data.createdAt;
    authUserObj.updatedAt = data.updatedAt;
    authUserObj.addressModel = AddressModel.fromJson(data.address);
    if (data.coordinators) {
      authUserObj.eventCoordinators = [];
      for (const s of data.coordinators) {
        authUserObj.eventCoordinators.push(<UserDropdownItem>{
          imagePath: s.imagePath ? (Array.isArray(s.imagePath) ? s.imagePath : [s.imagePath]) : [],
          id: s.id,
          name: s.name,
          parentId: s.parentId,
          subText: s.subText,
          isSelected: true,
        });
      }
    }
    if (data.agenda) {
      authUserObj.agenda = []
      for (const s of data.agenda) {
        authUserObj.agenda.push(EventAgendaModel.fromJson(s));
      }
    }
    return authUserObj;
  }
}

export class EventAgendaModel {
  agendaDate: moment.Moment;
  agendaDetail: EventAgendaDetailModel[];

  static fromJson(data: any): EventAgendaModel | null {
    if (!data) {
      return null;
    }
    const authUserObj: EventAgendaModel = new EventAgendaModel();
    authUserObj.agendaDate = data.agendaDate ? moment(data.agendaDate) : null;

    authUserObj.agendaDetail = []
    for (const s of data.agendaDetail) {
      authUserObj.agendaDetail.push(EventAgendaDetailModel.fromJson(s));
    }

    return authUserObj;
  }
}

export class EventAgendaDetailModel {
  startTime: moment.Moment;
  endTime?: moment.Moment;
  desc?: string;

  static fromJson(data: any): EventAgendaDetailModel | null {
    if (!data) {
      return null;
    }
    const authUserObj: EventAgendaDetailModel = new EventAgendaDetailModel();
    authUserObj.startTime = data.startTime ? data.startTime : null;
    authUserObj.endTime = data.endTime ? data.endTime : null;
    authUserObj.desc = data.desc;
    return authUserObj;
  }
}
