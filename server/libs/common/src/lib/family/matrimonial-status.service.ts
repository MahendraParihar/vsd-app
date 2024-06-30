import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MatrimonialStatusModel } from '../models/family';
import {
  IBaseAdminUser,
  IMatrimonialStatusList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageMatrimonialStatus,
  IMatrimonialStatus,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class MatrimonialStatusService {
  constructor(@InjectModel(MatrimonialStatusModel) private matrimonialStatusModel: typeof MatrimonialStatusModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IMatrimonialStatusList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          status: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.matrimonialStatusModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
    });
    const data = rows.map((data: MatrimonialStatusModel) => {
      return <IMatrimonialStatusList>{
        matrimonialStatusId: data.matrimonialStatusId,
        matrimonialStatus: data.status,
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
    return <ITableList<IMatrimonialStatusList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IMatrimonialStatus> {
    const obj = await this.matrimonialStatusModel.findOne({ where: { matrimonialStatusId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_MATRIMONIAL_STATUS));
    }
    return <IMatrimonialStatus>{
      matrimonialStatusId: obj.matrimonialStatusId,
      matrimonialStatus: obj.status,
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<IMatrimonialStatusList> {
    const data = await this.matrimonialStatusModel.scope('list').findOne({
      where: { matrimonialStatusId: id },
    });

    return <IMatrimonialStatusList>{
      matrimonialStatusId: data.matrimonialStatusId,
      matrimonialStatus: data.status,
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

  async manage(obj: IManageMatrimonialStatus, userId: number) {
    const dataObj = {
      status: obj.matrimonialStatus,
      modifiedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.matrimonialStatusId) {
      await this.matrimonialStatusModel.update(dataObj, { where: { matrimonialStatusId: obj.matrimonialStatusId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.matrimonialStatusModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.matrimonialStatusModel.findOne({ where: { matrimonialStatusId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
