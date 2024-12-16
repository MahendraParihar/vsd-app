import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RaasiModel } from '../models/family';
import {
  IBaseAdminUser,
  IRaasiList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageRaasi,
  IRaasi,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class RaasiService {
  constructor(@InjectModel(RaasiModel) private raasiModel: typeof RaasiModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IRaasiList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          raasi: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.raasiModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['raasi', 'asc']],
    });
    const data = rows.map((data: RaasiModel) => {
      return <IRaasiList>{
        raasiId: data.raasiId,
        raasi: data.raasi,
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
    return <ITableList<IRaasiList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IRaasi> {
    const obj = await this.raasiModel.findOne({
      where: { raasiId: id }, raw: true,
      nest: true,
    });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_RAASI));
    }
    return <IRaasi>obj;
  }

  async loadDetailById(id: number): Promise<IRaasiList> {
    const data = await this.raasiModel.scope('list').findOne({
      where: { raasiId: id },
    });

    return <IRaasiList>{
      raasiId: data.raasiId,
      raasi: data.raasi,
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

  async manage(obj: IManageRaasi, userId: number) {
    const dataObj = {
      raasi: obj.raasi,
      updatedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.raasiId) {
      await this.raasiModel.update(dataObj, { where: { raasiId: obj.raasiId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.raasiModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.raasiModel.findOne({ where: { raasiId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
