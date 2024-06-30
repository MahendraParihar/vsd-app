import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MatrimonialRequestedStatusModel } from '../models/family';
import {
  IBaseAdminUser,
  IMatrimonialRequestedStatusList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageMatrimonialRequestedStatus,
  IMatrimonialRequestedStatus,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class MatrimonialRequestedStatusService {
  constructor(
    @InjectModel(MatrimonialRequestedStatusModel)
    private matrimonialRequestedStatusModel: typeof MatrimonialRequestedStatusModel,
    private labelService: LabelService,
  ) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IMatrimonialRequestedStatusList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          matrimonialRequestedStatus: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.matrimonialRequestedStatusModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order:[["matrimonialRequestedStatus","asc"]],
    });
    const data = rows.map((data: MatrimonialRequestedStatusModel) => {
      return <IMatrimonialRequestedStatusList>{
        matrimonialRequestedStatusId: data.matrimonialRequestedStatusId,
        matrimonialRequestedStatus: data.matrimonialRequestedStatus,
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
    return <ITableList<IMatrimonialRequestedStatusList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IMatrimonialRequestedStatus> {
    const obj = await this.matrimonialRequestedStatusModel.findOne({ where: { matrimonialRequestedStatusId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_MATRIMONIAL_REQUESTED_STATUS));
    }
    return <IMatrimonialRequestedStatus>{
      matrimonialRequestedStatusId: obj.matrimonialRequestedStatusId,
      matrimonialRequestedStatus: obj.matrimonialRequestedStatus,
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<IMatrimonialRequestedStatusList> {
    const data = await this.matrimonialRequestedStatusModel.scope('list').findOne({
      where: { matrimonialRequestedStatusId: id },
    });
    return <IMatrimonialRequestedStatusList>{
      matrimonialRequestedStatusId: data.matrimonialRequestedStatusId,
      matrimonialRequestedStatus: data.matrimonialRequestedStatus,
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

  async manage(obj: IManageMatrimonialRequestedStatus, userId: number) {
    const dataObj = {
      matrimonialRequestedStatus: obj.matrimonialRequestedStatus,
      modifiedBy: userId,
    };
    if (obj.matrimonialRequestedStatusId) {
      await this.matrimonialRequestedStatusModel.update(dataObj, { where: { matrimonialRequestedStatusId: obj.matrimonialRequestedStatusId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.matrimonialRequestedStatusModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.matrimonialRequestedStatusModel.findOne({ where: { matrimonialRequestedStatusId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
