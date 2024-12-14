import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MediaTypeModel } from '../models/media-type.model';
import {
  ITableListFilter,
  LabelKey,
  IBaseAdminUser,
  IManageMediaType,
  ITableList,
  IStatusChange,
  IMediaTypeList,
  IMediaType,
} from '@vsd-common/lib';
import { LabelService } from '../label';
import { Op } from 'sequelize';

@Injectable()
export class MediaTypeService {
  constructor(@InjectModel(MediaTypeModel) private mediaTypeModel: typeof MediaTypeModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IMediaTypeList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          faqCategory: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.mediaTypeModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
    });
    const data = rows.map((data: MediaTypeModel) => {
      return <IMediaTypeList>{
        mediaTypeId: data.mediaTypeId,
        mediaType: data.mediaType,
        active: data.active,
        createdAt: data.createdAt,
        createdBy: data.createdBy,
        updatedAt: data.updatedAt,
        updatedBy: data.updatedBy,
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
    return <ITableList<IMediaTypeList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IMediaType> {
    const obj = await this.mediaTypeModel.findOne({ where: { mediaTypeId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_MEDIA_TYPE));
    }
    return <IMediaType>{
      ...obj,
      updatedBy: obj.updatedBy,
    };
  }

  async loadDetailById(id: number): Promise<IMediaTypeList> {
    const data = await this.mediaTypeModel.scope('list').findOne({
      where: { mediaTypeId: id },
    });
    return <IMediaTypeList>{
      mediaTypeId: data.mediaTypeId,
      mediaType: data.mediaType,
      active: data.active,
      createdAt: data.createdAt,
      createdBy: data.createdBy,
      updatedAt: data.updatedAt,
      updatedBy: data.updatedBy,
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

  async manage(obj: IManageMediaType, userId: number) {
    const dataObj = {
      mediaType: obj.mediaType,
      updatedBy: userId,
    };
    if (obj.mediaTypeId) {
      await this.mediaTypeModel.update(dataObj, { where: { mediaTypeId: obj.mediaTypeId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.mediaTypeModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.mediaTypeModel.findOne({ where: { mediaTypeId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
