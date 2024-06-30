import { IBaseAdminUser, ICommonTable } from '../base.interface';

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
}

export interface IEvent extends IBaseEvent, ICommonTable {
  eventId: number;
  active: boolean;
}

export interface IEventList extends IEvent {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
