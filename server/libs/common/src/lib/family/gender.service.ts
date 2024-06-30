import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GenderModel } from '../models/family/gender.model';
import {
  IBaseAdminUser,
  IGenderList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageGender,
  IGender,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class GenderService {
  constructor(@InjectModel(GenderModel) private genderModel: typeof GenderModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IGenderList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          gender: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.genderModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
    });
    const data = rows.map((data: GenderModel) => {
      return <IGenderList>{
        genderId: data.genderId,
        gender: data.gender,
        imagePath: data.imagePath,
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
    return <ITableList<IGenderList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IGender> {
    const obj = await this.genderModel.findOne({ where: { genderId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_GENDER));
    }
    return <IGender>{
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<IGenderList> {
    const data = await this.genderModel.scope('list').findOne({
      where: { genderId: id },
    });
    return <IGenderList>{
      genderId: data.genderId,
      gender: data.gender,
      imagePath: data.imagePath,
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

  async manage(obj: IManageGender, userId: number) {
    const dataObj = {
      gender: obj.gender,
      modifiedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.genderId) {
      await this.genderModel.update(dataObj, { where: { genderId: obj.genderId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.genderModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.genderModel.findOne({ where: { genderId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
