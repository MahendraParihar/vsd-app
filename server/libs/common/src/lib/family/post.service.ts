import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostModel } from '../models/mandal';
import {
  IBaseAdminUser,
  IPostList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManagePost,
  IPost,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class PostService {
  constructor(@InjectModel(PostModel) private postModel: typeof PostModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IPostList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          post: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.postModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order:[["post","asc"]],
    });
    const data = rows.map((data: PostModel) => {
      return <IPostList>{
        postId: data.postId,
        post: data.post,
        imagePath: data.imagePath,
        active: data.active,
        createdAt: data.createdAt,
        createdBy: data.createdBy,
        updatedAt: data.updatedAt,
        updatedBy: data.modifiedBy,
        createdByUser: <IBaseAdminUser>{
          firstName: data.createdByUser.firstName,
          lastName: data.createdByUser.lastName,
        },
        updatedByUser: <IBaseAdminUser>{
          firstName: data.updatedByUser.firstName,
          lastName: data.updatedByUser.lastName,
        },
      };
    });
    return <ITableList<IPostList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number) {
    const obj = await this.postModel.findOne({ where: { postId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_POST));
    }
    return <IPost>{
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<IPostList> {
    const data = await this.postModel.scope('list').findOne({
      where: { postId: id },
    });

    return <IPostList>{
      postId: data.postId,
      post: data.post,
      imagePath: data.imagePath,
      active: data.active,
      createdAt: data.createdAt,
      createdBy: data.createdBy,
      updatedAt: data.updatedAt,
      updatedBy: data.modifiedBy,
      createdByUser: <IBaseAdminUser>{
        firstName: data.createdByUser.firstName,
        lastName: data.createdByUser.lastName,
      },
      updatedByUser: <IBaseAdminUser>{
        firstName: data.updatedByUser.firstName,
        lastName: data.updatedByUser.lastName,
      },
    };
  }

  async manage(obj: IManagePost, userId: number) {
    const dataObj = {
      post: obj.post,
      modifiedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.postId) {
      await this.postModel.update(dataObj, { where: { postId: obj.postId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.postModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.postModel.findOne({ where: { postId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
