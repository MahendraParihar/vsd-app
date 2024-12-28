import { IBaseAdminUser, ICommonTable } from '../base.interface';
import { IMediaUpload } from '../core';

export interface IBaseRelationship {
  relationship: string;
  imagePath: IMediaUpload[];
}

export interface IManageRelationship extends IBaseRelationship {
  relationshipId?: number;
}

export interface IRelationship extends IBaseRelationship, ICommonTable {
  relationshipId: number;
  active: boolean;
}

export interface IRelationshipList extends IRelationship {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
