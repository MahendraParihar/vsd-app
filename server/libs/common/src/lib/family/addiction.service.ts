import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddictionModel } from '../models/family';
import {
  IAddictionList,
  IBaseAdminUser,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageAddiction,
  IAddiction,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class AddictionService {
  constructor(@InjectModel(AddictionModel) private addictionModel: typeof AddictionModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IAddictionList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        addiction: {
          [Op.iLike]: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.addictionModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order:[["addiction","asc"]],
    });
    const data = rows.map((data: AddictionModel) => {
      return <IAddictionList>{
        addictionId: data.addictionId,
        addiction: data.addiction,
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
    return <ITableList<IAddictionList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IAddiction> {
    const obj = await this.addictionModel.findOne({ where: { addictionId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_ADDICTION));
    }
    return <IAddiction>{
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<IAddictionList> {
    const data = await this.addictionModel.scope('list').findOne({
      where: {
        addictionId: id,
      },
    });
    return <IAddictionList>{
      addictionId: data.addictionId,
      addiction: data.addiction,
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

  async manage(obj: IManageAddiction, userId: number) {
    const dataObj = {
      addiction: obj.addiction,
      modifiedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.addictionId) {
      await this.addictionModel.update(dataObj, { where: { addictionId: obj.addictionId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.addictionModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.addictionModel.findOne({ where: { addictionId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
