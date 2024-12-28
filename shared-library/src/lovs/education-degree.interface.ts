import { IBaseAdminUser, ICommonTable } from "../base.interface";
import { IMediaUpload } from '../core';

export interface IBaseEducationDegree {
  degree: string;
  imagePath: IMediaUpload[];
}

export interface IManageEducationDegree extends IBaseEducationDegree {
  educationDegreeId?: number;
}

export interface IEducationDegree extends IBaseEducationDegree, ICommonTable {
  educationDegreeId: number;
  active: boolean;
}

export interface IEducationDegreeList extends IEducationDegree {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
