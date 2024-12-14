import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CityVillageModel } from '../models/location';
import {
  IBaseAdminUser,
  ICityVillageList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageCityVillage,
  ICityVillage,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class CityVillageService {
  constructor(@InjectModel(CityVillageModel) private cityVillageModel: typeof CityVillageModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<ICityVillageList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          cityVillage: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.cityVillageModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
    });
    const data = rows.map((data: CityVillageModel) => {
      return <ICityVillageList>{
        cityVillageId: data.cityVillageId,
        cityVillage: data.cityVillage,
        district: data.district.district,
        state: data.district.state.state,
        country: data.district.state.country.country,
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

    return <ITableList<ICityVillageList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number) {
    const obj = await this.cityVillageModel.findOne({ where: { cityVillageId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_ADDICTION));
    }
    return <ICityVillage>{
      ...obj,
      updatedBy: obj.updatedBy,
    };
  }

  async loadDetailById(id: number) {
    const data = await this.cityVillageModel.scope('list').findOne({
      where: { cityVillageId: id },
    });
    return <ICityVillageList>{
      cityVillageId: data.cityVillageId,
      cityVillage: data.cityVillage,
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

  async manage(obj: IManageCityVillage, userId: number) {
    const dataObj = {
      addiction: obj.cityVillage,
      districtId: obj.districtId,
      updatedBy: userId,
    };
    if (obj.cityVillageId) {
      await this.cityVillageModel.update(dataObj, { where: { cityVillageId: obj.cityVillageId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.cityVillageModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.cityVillageModel.findOne({ where: { cityVillageId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
