import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  IAddressDetail,
  IBaseAdminUser,
  IManageMandal,
  IMandal,
  IMandalAdditionalInfo,
  IMandalDetail,
  IMandalList,
  IStatusChange,
  ITableList,
  ITableListFilter,
  LabelKey,
} from '@vsd-common/lib';
import { MandalModel } from '../models/mandal.model';
import { Op } from 'sequelize';
import { AddressService, LabelService } from '@server/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class MandalService {
  constructor(@InjectModel(MandalModel) private mandalModel: typeof MandalModel,
              private labelService: LabelService,
              private addressService: AddressService,
              private sequelize: Sequelize) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IMandalList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          mandalName: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.mandalModel.scope('details').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['mandalName', 'asc']],
    });
    const data = rows.map((data: MandalModel) => {
      return this.formatMandal(data);
    });
    return <ITableList<IMandalList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IMandal> {
    const obj = await this.mandalModel.scope('list').findOne({ where: { mandalId: id }, raw: true, nest: true });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_MANDAL));
    }
    return <IMandal>{
      ...obj,
    };
  }

  async loadDetailById(id: number): Promise<IMandalDetail> {
    const data = await this.mandalModel.scope('details').findOne({
      where: { mandalId: id },
    });

    if (!data) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_MANDAL));
    }

    return this.formatMandal(data);
  }

  async manage(obj: IManageMandal, userId: number): Promise<IManageMandal> {
    const transaction = await this.sequelize.transaction();
    try {
      const dataObj = {
        mandalName: obj.mandalName,
        description: obj.description,
        updatedBy: userId,
        tags: obj.tags,
        metaTitle: obj.metaTitle,
        metaDescription: obj.metaDescription,
        url: obj.url
      };
      if (obj.imagePath) {
        Object.assign(dataObj, { imagePath: obj.imagePath });
      }
      const address = await this.addressService.manage(obj.address, transaction);
      obj.addressId = address.addressId;
      let res;
      if (obj.mandalId) {
        res = await this.mandalModel.update(dataObj, { where: { mandalId: obj.mandalId }, transaction: transaction });
      } else {
        Object.assign(dataObj, { createdBy: userId });
        res = await this.mandalModel.create(dataObj, { transaction: transaction });
      }
      await transaction.commit();
      return res;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.mandalModel.findOne({ where: { mandalId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }

  async loadPrimaryMandalInfo(): Promise<IMandalDetail> {
    return await this.loadDetailById(12);
  }

  private formatMandal(data: MandalModel) {
    return <IMandalDetail>{
      mandalId: data.mandalId,
      mandalName: data.mandalName,
      tags: data.tags,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      url: data.url,
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
      address: <IAddressDetail>{
        address: data.address.address,
        pinCode: data.address.pinCode,
        latitude: data.address.latitude,
        longitude: data.address.longitude,
        country: data.address.country.country,
        state: data.address.state.state,
        district: data.address.district.district,
        cityVillage: data.address.cityVillage.cityVillage,
      },
      additionalInfo: data.additionalInfo as IMandalAdditionalInfo,
    };
  }

}
