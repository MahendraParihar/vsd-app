import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IMediaUpload } from '../core';

export interface IBaseGender {
  gender: string;
  imagePath: IMediaUpload[];
}

export interface IManageGender extends IBaseGender {
  genderId?: number;
}

export interface IGender extends IBaseGender, ICommonTable {
  genderId: number;
  active: boolean;
}

export interface IGenderList extends IGender {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
