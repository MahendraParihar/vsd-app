import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FamilyModel } from '../models/family';
import { LabelService } from '../label';
import {
  IBaseAdminUser,
  IFamilyList,
  IManageFamily,
  IFamily,
  IStatusChange,
  ITableList,
  ITableListFilter,
  LabelKey,
} from '@vsd-common/lib';
import { Op } from 'sequelize';

@Injectable()
export class FamilyService {
  constructor(@InjectModel(FamilyModel) private familyModel: typeof FamilyModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IFamilyList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        addiction: {
          [Op.iLike]: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.familyModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
    });
    const data = rows.map((data: FamilyModel) => {
      return <IFamilyList>{
        familyId: data.familyId,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        emailId: data.emailId,
        visitedCount: data.visitedCount,
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
    return <ITableList<IFamilyList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IFamily> {
    const obj = await this.familyModel.findOne({ where: { familyId: id }, nest: true, raw: true });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_FAMILY));
    }
    return <IFamily>obj;
  }

  async loadDetailById(id: number): Promise<IFamilyList> {
    const data = await this.familyModel.scope('list').findOne({
      where: { familyId: id },
    });

    return <IFamilyList>{
      familyId: data.familyId,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      emailId: data.emailId,
      visitedCount: data.visitedCount,
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

  async manage(obj: IManageFamily, userId: number) {
    const dataObj = {
      firstName: obj.firstName,
      middleName: obj.middleName,
      lastName: obj.lastName,
      emailId: obj.emailId,
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
}
