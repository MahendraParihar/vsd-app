import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ITempleList, IBaseAdminUser, IStatusChange, ITableListFilter, ITableList } from '@vsd-common/lib';
import { TempleModel } from '../models/temple.model';
import { Op } from 'sequelize';

@Injectable()
export class TempleService {
  constructor(@InjectModel(TempleModel) private templeModel: typeof TempleModel) {
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
    });
    const data = rows.map((data: TempleModel) => {
      return <ITempleList>{
        templeId: data.templeId,
        templeName: data.templeName,
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
    return <ITableList<ITempleList>>{
      data: data,
      count: count,
    };
  }

  async getById() {
  }

  async loadDetailById(id: number) {
  }

  async manage() {
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.templeModel.findOne({ where: { templeId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
