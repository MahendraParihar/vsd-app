import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MediaSrcModel } from '../models/media-src.model';
import { Op } from 'sequelize';
import {
  IMediaSrcList,
  ITableListFilter,
  LabelKey,
  IBaseAdminUser,
  IManageMediaSrc,
  IMediaSrc,
  ITableList,
  IStatusChange,
} from '@vsd-common/lib';
import { LabelService } from '../label';

@Injectable()
export class MediaSrcService {
  constructor(@InjectModel(MediaSrcModel) private mediaSrcModel: typeof MediaSrcModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IMediaSrcList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          faqCategory: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.mediaSrcModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
    });
    const data = rows.map((data: MediaSrcModel) => {
      return <IMediaSrcList>{
        mediaSrcId: data.mediaSrcId,
        mediaSrc: data.mediaSrc,
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
    return <ITableList<IMediaSrcList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IMediaSrc> {
    const obj = await this.mediaSrcModel.findOne({ where: { mediaSrcId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_MEDIA_SRC));
    }
    return <IMediaSrc>{
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<IMediaSrcList> {
    const data = await this.mediaSrcModel.scope('list').findOne({
      where: { mediaSrcId: id },
    });

    return <IMediaSrcList>{
      mediaSrcId: data.mediaSrcId,
      mediaSrc: data.mediaSrc,
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

  async manage(obj: IManageMediaSrc, userId: number) {
    const dataObj = {
      mediaSrc: obj.mediaSrc,
      modifiedBy: userId,
    };
    if (obj.mediaSrcId) {
      await this.mediaSrcModel.update(dataObj, { where: { mediaSrcId: obj.mediaSrcId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.mediaSrcModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.mediaSrcModel.findOne({ where: { mediaSrcId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
