import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DistrictModel } from '../models/location';
import {
  IBaseAdminUser,
  IDistrictList,
  IManageDistrict,
  IStatusChange,
  ITableList,
  ITableListFilter,
  IDistrict,
  LabelKey,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(DistrictModel) private districtModel: typeof DistrictModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IDistrictList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          district: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.districtModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order:[['stateId','asc'],['district','asc']]
    });
    const data = rows.map((data: DistrictModel) => {
      return <IDistrictList>{
        districtId: data.districtId,
        district: data.district,
        state: data.state.state,
        stateId: data.stateId,
        country: data.state.country.country,
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

    return <ITableList<IDistrictList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IDistrict> {
    const obj = await this.districtModel.findOne({ where: { districtId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_DISTRICT));
    }
    return <IDistrict>{
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<IDistrictList> {
    const data = await this.districtModel.scope('list').findOne({
      where: { districtId: id },
    });
    return <IDistrictList>{
      districtId: data.districtId,
      district: data.district,
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

  async manage(obj: IManageDistrict, userId: number) {
    const dataObj = {
      district: obj.district,
      stateId: obj.stateId,
      modifiedBy: userId,
    };
    if (obj.districtId) {
      await this.districtModel.update(dataObj, { where: { districtId: obj.districtId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.districtModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.districtModel.findOne({ where: { districtId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
