import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CasteModel } from '../models/family';
import {
  IBaseAdminUser,
  ICasteList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageCaste,
  ICaste,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class CasteService {
  constructor(@InjectModel(CasteModel) private casteModel: typeof CasteModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<ICasteList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          caste: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.casteModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order:[["caste","asc"]],
    });
    const data = rows.map((data: CasteModel) => {
      return <ICasteList>{
        casteId: data.casteId,
        caste: data.caste,
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
    return <ITableList<ICasteList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<ICaste> {
    const obj = await this.casteModel.findOne({ where: { casteId: id }, nest:true, raw: true });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_CASTE));
    }
    return <ICaste>obj;
  }

  async loadDetailById(id: number) {
    const data = await this.casteModel.scope('list').findOne({
      where: { casteId: id },
    });

    return <ICasteList>{
      casteId: data.casteId,
      caste: data.caste,
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

  async manage(obj: IManageCaste, userId: number) {
    const dataObj = {
      caste: obj.caste,
      updatedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.casteId) {
      await this.casteModel.update(dataObj, { where: { casteId: obj.casteId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.casteModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.casteModel.findOne({ where: { casteId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
