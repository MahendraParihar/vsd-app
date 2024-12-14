import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ServiceModel } from '../models/family';
import {
  IBaseAdminUser,
  IServiceList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageService,
  IService,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class ServiceService {
  constructor(@InjectModel(ServiceModel) private serviceModel: typeof ServiceModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IServiceList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          service: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.serviceModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order:[["service","asc"]],
    });
    const data = rows.map((data: ServiceModel) => {
      return <IServiceList>{
        serviceId: data.serviceId,
        service: data.service,
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
    return <ITableList<IServiceList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IService> {
    const obj = await this.serviceModel.findOne({ where: { serviceId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_SERVICE));
    }
    return <IService>{
      ...obj,
      updatedBy: obj.updatedBy,
    };
  }

  async loadDetailById(id: number): Promise<IServiceList> {
    const data = await this.serviceModel.scope('list').findOne({
      where: { serviceId: id },
    });
    return <IServiceList>{
      serviceId: data.serviceId,
      service: data.service,
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

  async manage(obj: IManageService, userId: number) {
    const dataObj = {
      service: obj.service,
      updatedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.serviceId) {
      await this.serviceModel.update(dataObj, { where: { serviceId: obj.serviceId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.serviceModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.serviceModel.findOne({ where: { serviceId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
