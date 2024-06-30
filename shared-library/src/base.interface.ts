export interface IBaseAdminUser{
  firstName: string;
  lastName: string;
}

export interface ICommonTable{
  active: boolean;
  createdBy: number;
  createdAt: Date;
  updatedBy: number;
  updatedAt: Date;
}
