import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CountryModel } from '../models/location';
import {
  IBaseAdminUser,
  ICountryList,
  ITableListFilter,
  ITableList,
  IStatusChange,
  LabelKey,
  IManageCountry,
  ICountry,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class CountryService {
  constructor(@InjectModel(CountryModel) private countryModel: typeof CountryModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<ICountryList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        country:{
          [Op.iLike]:`%${payload.search}%`,
        }
      });
    }
    const { rows, count } = await this.countryModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order:[['country','asc']]
    });
    const data = rows.map((data: CountryModel) => {
      return <ICountryList>{
        countryId: data.countryId,
        country: data.country,
        countryCode: data.countryCode,
        phoneNumberCode: data.phoneNumberCode,
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

    return <ITableList<ICountryList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<ICountry> {
    const obj = await this.countryModel.findOne({ where: { countryId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_COUNTRY));
    }
    return <ICountry>{
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number) {
    const data = await this.countryModel.scope('list').findOne({
      where: { countryId: id },
    });
    return <ICountryList>{
      countryId: data.countryId,
      country: data.country,
      countryCode: data.countryCode,
      phoneNumberCode: data.phoneNumberCode,
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

  async manage(obj: IManageCountry, userId: number) {
    const dataObj = {
      country: obj.country,
      phoneNumberCode: obj.phoneNumberCode,
      countryCode: obj.countryCode,
      modifiedBy: userId,
    };
    if (obj.countryId) {
      await this.countryModel.update(dataObj, { where: { countryId: obj.countryId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.countryModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.countryModel.findOne({ where: { countryId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
