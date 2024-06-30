import { IBaseAdminUser, ICommonTable } from "../base.interface";

export interface IBasePost {
  post: string;
  imagePath: object;
}

export interface IManagePost extends IBasePost {
  postId?: number;
}

export interface IPost extends IBasePost, ICommonTable {
  postId: number;
  active: boolean;
}

export interface IPostList extends IPost {
  createdByUser: IBaseAdminUser;
  updatedByUser: IBaseAdminUser;
}
