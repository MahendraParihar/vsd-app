import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {
  IBaseAdminUser,
  IManageTemple,
  IStatusChange,
  ITableList,
  ITableListFilter,
  ITemple,
  ITempleList,
  LabelKey
} from '@vsd-common/lib';
import {TempleModel} from '../models/temple.model';
import {Op} from 'sequelize';
import {LabelService} from "@server/common";

@Injectable()
export class TempleService {
  constructor(@InjectModel(TempleModel) private templeModel: typeof TempleModel,
              private labelService: LabelService) {
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
    const {rows, count} = await this.templeModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['templeName', 'asc']]
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

  async getById(id: number): Promise<ITemple> {
    const obj = await this.templeModel.findOne({where: {templeId: id}});
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_TEMPLE));
    }
    return <ITemple>{
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<ITempleList> {
    const data = await this.templeModel.scope('list').findOne({
      where: {templeId: id}
    });

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
  }

  async manage(obj: IManageTemple, userId: number) {
    const dataObj = {
      templeName: obj.templeName,
      modifiedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, {imagePath: obj.imagePath});
    }
    if (obj.templeId) {
      await this.templeModel.update(dataObj, {where: {templeId: obj.templeId}});
    } else {
      Object.assign(dataObj, {createdBy: userId});
      await this.templeModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.templeModel.findOne({where: {templeId: id}});
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
