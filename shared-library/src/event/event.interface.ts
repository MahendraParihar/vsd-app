import { IBaseAdminUser, ICommonSEO, ICommonTable } from '../base.interface';
import { IAddressDetail, IManageAddress } from '../location';
import { IMediaUpload } from '../core';

export interface IEventAgendaDetail {
  title: string;
  details: string;
  date: Date;
  time: Date;
}

export interface IEventAgenda {
  date: Date;
  details: IEventAgendaDetail[];
}

export interface IBaseEvent {
  title: string;
  description: string;
  date: Date;
  time: Date;
  imagePath: IMediaUpload[];
  addressId?: number;
  agenda: IEventAgenda[];
  visitedCount: number;
}

export interface IManageEvent extends IBaseEvent, ICommonSEO {
  eventId?: number;
  address: IManageAddress;
}

export interface IEvent extends IBaseEvent, ICommonTable, ICommonSEO {
  eventId: number;
  active: boolean;
}

export interface IEventList extends IEvent {
  address: IAddressDetail;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
