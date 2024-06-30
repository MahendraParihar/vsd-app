import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JobTypeModel } from '../models/job';
import {
  IBaseAdminUser,
  IJobTypeList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageJobType,
  IJobType,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class JobTypeService {
  constructor(@InjectModel(JobTypeModel) private jobTypeModel: typeof JobTypeModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IJobTypeList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          jobType: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.jobTypeModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
    });
    const data = rows.map((data: JobTypeModel) => {
      return <IJobTypeList>{
        jobTypeId: data.jobTypeId,
        jobType: data.jobType,
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
    return <ITableList<IJobTypeList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IJobType> {
    const obj = await this.jobTypeModel.findOne({ where: { jobTypeId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_ADDICTION));
    }
    return <IJobType>{
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<IJobTypeList> {
    const data = await this.jobTypeModel.scope('list').findOne({
      where: { jobTypeId: id },
    });

    return <IJobTypeList>{
      jobTypeId: data.jobTypeId,
      jobType: data.jobType,
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

  async manage(obj: IManageJobType, userId: number) {
    const dataObj = {
      jobType: obj.jobType,
      modifiedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.jobTypeId) {
      await this.jobTypeModel.update(dataObj, { where: { jobTypeId: obj.jobTypeId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.jobTypeModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.jobTypeModel.findOne({ where: { jobTypeId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
