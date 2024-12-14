import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HealthParameterUnitModel } from '../models/family';
import {
  ITableListFilter,
  IBaseAdminUser,
  IHealthParameterUnitList,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageHealthParameterUnit,
  IHealthParameterUnit,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class HealthParameterUnitService {
  constructor(
    @InjectModel(HealthParameterUnitModel) private healthParameterUnitModel: typeof HealthParameterUnitModel,
    private labelService: LabelService,
  ) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IHealthParameterUnitList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          gotra: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.healthParameterUnitModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order:[["healthParameterUnit","asc"]],
    });
    const data = rows.map((data: HealthParameterUnitModel) => {
      return <IHealthParameterUnitList>{
        healthParameterUnitId: data.healthParameterUnitId,
        healthParameterUnit: data.healthParameterUnit,
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
    return <ITableList<IHealthParameterUnitList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IHealthParameterUnit> {
    const obj = await this.healthParameterUnitModel.findOne({ where: { healthParameterUnitId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_HEALTH_PARAMETER));
    }
    return <IHealthParameterUnit>{
      ...obj,
      updatedBy: obj.updatedBy,
    };
  }

  async loadDetailById(id: number): Promise<IHealthParameterUnitList> {
    const data = await this.healthParameterUnitModel.scope('list').findOne({
      where: { healthParameterUnitId: id },
    });
    return <IHealthParameterUnitList>{
      healthParameterUnitId: data.healthParameterUnitId,
      healthParameterUnit: data.healthParameterUnit,
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

  async manage(obj: IManageHealthParameterUnit, userId: number) {
    const dataObj = {
      healthParameterUnit: obj.healthParameterUnit,
      updatedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.healthParameterUnitId) {
      await this.healthParameterUnitModel.update(dataObj, { where: { healthParameterUnitId: obj.healthParameterUnitId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.healthParameterUnitModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.healthParameterUnitModel.findOne({ where: { healthParameterUnitId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
