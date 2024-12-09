import { IBaseAdminUser, ICommonTable } from '../base.interface';
import { IAddressDetail, IManageAddress } from '../location';

export interface IBaseEvent {
  title: string;
  description: string;
  date: Date;
  time: Date;
  imagePath: object;
  visitedCount: number;
}

export interface IManageEvent extends IBaseEvent {
  eventId?: number;
  address: IManageAddress;
}

export interface IEvent extends IBaseEvent, ICommonTable {
  eventId: number;
  active: boolean;
}

export interface IEventList extends IEvent {
  address: IAddressDetail;
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
