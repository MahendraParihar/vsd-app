import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  AppConfigEnum,
  IAddressDetail,
  IBaseAdminUser,
  IManageTemple,
  IStatusChange,
  ITableList,
  ITableListFilter,
  ITemple,
  ITempleList,
  LabelKey,
} from '@vsd-common/lib';
import { TempleModel } from '../models/temple.model';
import { Op } from 'sequelize';
import { AddressService, AppConfigService, buildImageUrl, LabelService } from '@server/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class TempleService {
  constructor(@InjectModel(TempleModel) private templeModel: typeof TempleModel,
              private labelService: LabelService,
              private sequelize: Sequelize,
              private appConfigService: AppConfigService,
              private addressService: AddressService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<ITempleList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          templeName: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.templeModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['templeName', 'asc']],
    });
    const data = rows.map((data: TempleModel) => {
      return this.formatObj(data);
    });
    return <ITableList<ITempleList>>{
      data: data,
      count: count,
    };
  }

  async loadHomeTemples(): Promise<ITempleList[]> {
    const data = await this.templeModel.scope('list').findAll({
      where: {
        active: true,
      },
      order: ['templeId'],
      limit: 4,
    });

    return data.map((m) => {
      return this.formatObj(m.get({ plain: true }));
    });
  }

  async getById(id: number): Promise<ITemple> {
    const obj = await this.templeModel.findOne({ where: { templeId: id }, nest: true, raw: true });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_TEMPLE));
    }
    return <ITemple>obj;
  }

  async loadDetailByUrl(url: string): Promise<ITempleList> {
    const data = await this.templeModel.scope('list').findOne({
      where: { url: url },
    });

    return this.formatObj(data);
  }

  async loadDetailById(id: number): Promise<ITempleList> {
    const data = await this.templeModel.findOne({
      where: { templeId: id },
    });

    return this.formatObj(data);
  }

  async manage(obj: IManageTemple, userId: number): Promise<IManageTemple> {
    const transaction = await this.sequelize.transaction();
    try {
      const dataObj = {
        templeName: obj.templeName,
        description: obj.description,
        updatedBy: userId,
        tags: obj.tags,
        metaTitle: obj.metaTitle,
        metaDescription: obj.metaDescription,
        url: obj.url,
      };
      if (obj.imagePath) {
        Object.assign(dataObj, { imagePath: obj.imagePath });
      }
      let res;
      const address = await this.addressService.manage(obj.address, transaction, userId, ':0', ':0');
      Object.assign(dataObj, { addressId: address.addressId });
      if (obj.templeId) {
        res = await this.templeModel.update(dataObj, { where: { templeId: obj.templeId }, transaction: transaction });
      } else {
        Object.assign(dataObj, { createdBy: userId });
        res = await this.templeModel.create(dataObj, { transaction: transaction });
      }
      await transaction.commit();
      return res;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.templeModel.findOne({ where: { templeId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }

  private formatObj(data: TempleModel) {
    return <ITempleList>{
      templeId: data.templeId,
      templeName: data.templeName,
      imagePath: buildImageUrl(data.imagePath, this.appConfigService.getString(AppConfigEnum.CLIENT_URL)),
      tags: data.tags,
      description: data.description,
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
    };
  }
}
