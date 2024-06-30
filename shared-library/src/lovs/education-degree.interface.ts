import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseEducationDegree {
  degree: string;
  imagePath: object;
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
