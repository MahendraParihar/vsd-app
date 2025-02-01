import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
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
import { FamilyModel, LabelService } from '@server/common';

@Injectable()
export class FamilyService {
  constructor(@InjectModel(FamilyModel) private familyModel: typeof FamilyModel,
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
    console.log(where);
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
    const obj = await this.familyModel.findOne({ where: { familyId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_FAMILY));
    }
    return <IFamily>{
      ...obj,
      updatedBy: obj.updatedBy,
    };
  }

  async loadDetailById(id: number): Promise<IFamilyList> {
    const data = await this.familyModel.scope('list').findOne({
      where: { familyId: id },
    });

    return this.formatFamily(data, true) as IFamilyList;
  }

  async manage(obj: IManageFamily, userId: number) {
    const dataObj = {
      title: obj.firstName,
      updatedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.familyId) {
      await this.familyModel.update(dataObj, { where: { familyId: obj.familyId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.familyModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.familyModel.findOne({ where: { familyId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }

  private formatFamily(data: FamilyModel, allDetails: boolean): IFamilyList | Partial<IFamilyList> {
    console.log(data);
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
      imagePath: data.imagePath,
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
