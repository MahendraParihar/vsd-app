import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GotraModel } from '../models/family';
import {
  IBaseAdminUser,
  IGotraList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageGotra,
  IGotra,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class GotraService {
  constructor(@InjectModel(GotraModel) private gotraModel: typeof GotraModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IGotraList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          gotra: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.gotraModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order:[["gotra","asc"]],
    });
    const data = rows.map((data: GotraModel) => {
      return <IGotraList>{
        gotraId: data.gotraId,
        gotra: data.gotra,
        imagePath: data.imagePath,
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
    return <ITableList<IGotraList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IGotra> {
    const obj = await this.gotraModel.findOne({ where: { gotraId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_GOTRA));
    }
    return <IGotra>{
      ...obj,
      updatedBy: obj.updatedBy,
    };
  }

  async loadDetailById(id: number): Promise<IGotraList> {
    const data = await this.gotraModel.scope('list').findOne({
      where: { gotraId: id },
    });

    return <IGotraList>{
      gotraId: data.gotraId,
      gotra: data.gotra,
      imagePath: data.imagePath,
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

  async manage(obj: IManageGotra, userId: number) {
    const dataObj = {
      gotra: obj.gotra,
      updatedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.gotraId) {
      await this.gotraModel.update(dataObj, { where: { gotraId: obj.gotraId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.gotraModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.gotraModel.findOne({ where: { gotraId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
