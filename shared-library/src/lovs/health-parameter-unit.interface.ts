import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBaseHealthParameterUnit {
  healthParameterUnit: string;
  imagePath: object;
}

export interface IManageHealthParameterUnit extends IBaseHealthParameterUnit {
  healthParameterUnitId?: number;
}

export interface IHealthParameterUnit extends IBaseHealthParameterUnit, ICommonTable {
  healthParameterUnitId: number;
  active: boolean;
}

export interface IHealthParameterUnitList extends IHealthParameterUnit {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
