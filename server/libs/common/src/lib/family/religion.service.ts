import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ReligionModel } from '../models/family';
import {
  IBaseAdminUser,
  IReligionList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageReligion,
  IReligion,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class ReligionService {
  constructor(@InjectModel(ReligionModel) private religionModel: typeof ReligionModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IReligionList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          religion: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.religionModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
    });
    const data = rows.map((data: ReligionModel) => {
      return <IReligionList>{
        religionId: data.religionId,
        religion: data.religion,
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
    return <ITableList<IReligionList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IReligion> {
    const obj = await this.religionModel.findOne({ where: { religionId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_RELIGION));
    }
    return <IReligion>{
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<IReligionList> {
    const data = await this.religionModel.scope('list').findOne({
      where: { religionId: id },
    });
    return <IReligionList>{
      religionId: data.religionId,
      religion: data.religion,
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

  async manage(obj: IManageReligion, userId: number) {
    const dataObj = {
      religion: obj.religion,
      modifiedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.religionId) {
      await this.religionModel.update(dataObj, { where: { religionId: obj.religionId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.religionModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.religionModel.findOne({ where: { religionId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
