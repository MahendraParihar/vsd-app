import { Injectable } from '@nestjs/common';
import { JobCategoryModel } from '../models/job';
import { InjectModel } from '@nestjs/sequelize';
import {
  IBaseAdminUser,
  IJobCategoryList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageJobCategory,
  IJobCategory,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class JobCategoryService {
  constructor(@InjectModel(JobCategoryModel) private jobCategoryModel: typeof JobCategoryModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IJobCategoryList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          jobCategory: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.jobCategoryModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
    });
    const data = rows.map((data: JobCategoryModel) => {
      return <IJobCategoryList>{
        jobCategoryId: data.jobCategoryId,
        jobCategory: data.jobCategory,
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
    return <ITableList<IJobCategoryList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IJobCategory> {
    const obj = await this.jobCategoryModel.findOne({ where: { jobCategoryId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_JOB_CATEGORY));
    }
    return <IJobCategory>{
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<IJobCategoryList> {
    const data = await this.jobCategoryModel.scope('list').findOne({
      where: { jobCategoryId: id },
    });

    return <IJobCategoryList>{
      jobCategoryId: data.jobCategoryId,
      jobCategory: data.jobCategory,
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

  async manage(obj: IManageJobCategory, userId: number) {
    const dataObj = {
      jobCategory: obj.jobCategory,
      modifiedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.jobCategoryId) {
      await this.jobCategoryModel.update(dataObj, { where: { jobCategoryId: obj.jobCategoryId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.jobCategoryModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.jobCategoryModel.findOne({ where: { jobCategoryId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
