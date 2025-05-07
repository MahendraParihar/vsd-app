import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  AppConfigEnum,
  IAddressDetail,
  IBaseAdminUser,
  IFamily,
  IFamilyList,
  IManageFamily,
  IStatusChange,
  ITableList,
  ITableListFilter,
  LabelKey,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { AddressService, AppConfigService, buildImageUrl, FamilyModel, LabelService } from '@server/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class FamilyService {
  constructor(@InjectModel(FamilyModel) private familyModel: typeof FamilyModel,
              private addressService: AddressService,
              private sequelize: Sequelize,
              private appConfigService: AppConfigService,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IFamilyList>> {
    const where = {};
    if (payload.search) {
      payload.search = payload.search.toLowerCase();
      Object.assign(where, {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${payload.search}%` } },
          { lastName: { [Op.iLike]: `%${payload.search}%` } },
          { middleName: { [Op.iLike]: `%${payload.search}%` } },
        ],
      });
    }
    if (payload.ids) {
      Object.assign(where, { familyId: payload.ids });
    }
    const { rows, count } = await this.familyModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['firstName', 'desc'], ['middleName', 'desc'], ['lastName', 'asc']],
    });
    const data = rows.map((data: FamilyModel) => {
      return this.formatFamily(data.get({ plain: true }), true);
    });
    return <ITableList<IFamilyList>>{
      data: data,
      count: count,
    };
  }

  async searchFamily(payload: ITableListFilter, allDetails: boolean): Promise<Partial<IFamilyList>[]> {
    const where = {};
    if (payload.search) {
      payload.search = payload.search.toLowerCase();
      Object.assign(where, {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${payload.search}%` } },
          { lastName: { [Op.iLike]: `%${payload.search}%` } },
          { middleName: { [Op.iLike]: `%${payload.search}%` } },
        ],
      });
    }
    if (payload.ids) {
      Object.assign(where, { familyId: payload.ids });
    }
    const rows = await this.familyModel.scope('list').findAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['firstName', 'desc'], ['middleName', 'desc'], ['lastName', 'asc']],
    });
    return rows.map((data: FamilyModel) => {
      return this.formatFamily(data.get({ plain: true }), allDetails);
    }) as Partial<IFamilyList>[];
  }

  async getById(id: number): Promise<IFamily> {
    const obj = await this.familyModel.scope('details').findOne({ where: { familyId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_FAMILY));
    }
    return <IFamily>obj;
  }

  async loadDetailById(id: number): Promise<IFamilyList> {
    const data = await this.familyModel.scope('list').findOne({
      where: { familyId: id },
    });

    return this.formatFamily(data, true) as IFamilyList;
  }

  async manage(obj: IManageFamily, userId: number, requestedIp: string) {
    const transaction = await this.sequelize.transaction();
    try {
      const dataObj = {
        firstName: obj.firstName,
        middleName: obj.middleName,
        lastName: obj.lastName,
        emailId: obj.emailId,
        updatedBy: userId,
        modifiedIp: requestedIp,
      };
      if (obj.imagePath) {
        Object.assign(dataObj, { imagePath: obj.imagePath });
      }

      const address = await this.addressService.manage(obj.address, transaction, userId, requestedIp, requestedIp);
      Object.assign(dataObj, { addressId: address.addressId });

      if (obj.familyId) {
        await this.familyModel.update(dataObj, { where: { familyId: obj.familyId }, transaction: transaction });
      } else {
        Object.assign(dataObj, { createdBy: userId });
        Object.assign(dataObj, { createdIp: requestedIp });
        await this.familyModel.create(dataObj, { transaction: transaction });
      }
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number, requestedIp: string) {
    const obj = await this.familyModel.findOne({ where: { familyId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    obj.modifiedIp = requestedIp;
    await obj.save();
  }

  private formatFamily(data: FamilyModel, allDetails: boolean): IFamilyList | Partial<IFamilyList> {
    if (!allDetails) {
      return <IFamilyList>{
        familyId: data.familyId,
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName,
        imagePath: data.imagePath,
        address: <IAddressDetail>{
          cityVillage: data.address ? data.address.cityVillage.cityVillage : '',
        },
      };
    }
    return <IFamilyList>{
      familyId: data.familyId,
      firstName: data.firstName,
      lastName: data.lastName,
      imagePath: buildImageUrl(data.imagePath, this.appConfigService.getString(AppConfigEnum.CLIENT_URL)),
      emailId: data.emailId,
      middleName: data.middleName,
      visitedCount: data.visitedCount,
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
      address: !data.address ? null : <IAddressDetail>{
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
