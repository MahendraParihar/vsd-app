import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BusinessModel } from '../models/family';
import {
  IBaseAdminUser,
  IBusinessList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageBusiness,
  IBusiness,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class BusinessService {
  constructor(@InjectModel(BusinessModel) private businessModel: typeof BusinessModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IBusinessList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          business: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.businessModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['business', 'asc']],
    });
    const data = rows.map((data: BusinessModel) => {
      return <IBusinessList>{
        businessId: data.businessId,
        business: data.business,
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
    return <ITableList<IBusinessList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IBusiness> {
    const obj = await this.businessModel.findOne({ where: { businessId: id }, nest: true, raw: true });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_BUSINESS));
    }
    return <IBusiness>obj;
  }

  async loadDetailById(id: number) {
    const data = await this.businessModel.scope('list').findOne({
      where: { businessId: id },
    });

    return <IBusinessList>{
      businessId: data.businessId,
      business: data.business,
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

  async manage(obj: IManageBusiness, userId: number) {
    const dataObj = {
      business: obj.business,
      updatedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.businessId) {
      await this.businessModel.update(dataObj, { where: { businessId: obj.businessId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.businessModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.businessModel.findOne({ where: { businessId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
