import { IBaseAdminUser, ICommonTable } from '../base.interface';

export interface IBaseEvent {
  title: string;
  description: string;
  date: Date;
  time: Date;
  imagePath: object;
  visitedCount: object;
}

export interface IManageEvent extends IBaseEvent {
  EventId?: number;
}

export interface IEvent extends IBaseEvent, ICommonTable {
  EventId: number;
  active: boolean;
}

export interface IEventList extends IEvent {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
