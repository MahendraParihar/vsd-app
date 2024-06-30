import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MaritalStatusModel } from '../models/family';
import {
  IBaseAdminUser,
  IMaritalStatusList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageMaritalStatus,
  IMaritalStatus,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class MaritalStatusService {
  constructor(@InjectModel(MaritalStatusModel) private maritalStatusModel: typeof MaritalStatusModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IMaritalStatusList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          gotra: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.maritalStatusModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order:[["maritalStatus","asc"]],
    });
    const data = rows.map((data: MaritalStatusModel) => {
      return <IMaritalStatusList>{
        maritalStatusId: data.maritalStatusId,
        maritalStatus: data.maritalStatus,
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
    return <ITableList<IMaritalStatusList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IMaritalStatus> {
    const obj = await this.maritalStatusModel.findOne({ where: { maritalStatusId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_MARITAL_STATUS));
    }
    return <IMaritalStatus>{
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<IMaritalStatusList> {
    const data = await this.maritalStatusModel.scope('list').findOne({
      where: { maritalStatusId: id },
    });

    return <IMaritalStatusList>{
      maritalStatusId: data.maritalStatusId,
      maritalStatus: data.maritalStatus,
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

  async manage(obj: IManageMaritalStatus, userId: number) {
    const dataObj = {
      maritalStatus: obj.maritalStatus,
      modifiedBy: userId,
    };
    if (obj.maritalStatusId) {
      await this.maritalStatusModel.update(dataObj, { where: { maritalStatusId: obj.maritalStatusId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.maritalStatusModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.maritalStatusModel.findOne({ where: { maritalStatusId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
