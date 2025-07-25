import { IBaseAdminUser, ICommonSEO, ICommonTable } from '../base.interface';
import { IAddressDetail, IManageAddress } from '../location';
import { IMediaUpload, IMemberPost, IMemberPostInfo } from '../core';

export interface IEventAgendaDetail {
  title: string;
  details: string;
  date: string;
  time: string;
}

export interface IEventAgenda {
  date: Date;
  details: IEventAgendaDetail[];
}

export interface IBaseEvent {
  title: string;
  description: string;
  date: string;
  time: string;
  imagePath: IMediaUpload[];
  addressId?: number;
  agenda: IEventAgenda[];
  visitedCount: number;
}

export interface IManageEvent extends IBaseEvent, ICommonSEO {
  eventId?: number;
  address: IManageAddress;
  members: IMemberPost[];
}

export interface IEvent extends IBaseEvent, ICommonTable, ICommonSEO {
  eventId: number;
  active: boolean;
  members: IMemberPost[];
}

export interface IEventList extends IEvent {
  address: IAddressDetail;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}

export interface IEventDetail extends IEventList {
  eventMembers: IMemberPostInfo[];
}
