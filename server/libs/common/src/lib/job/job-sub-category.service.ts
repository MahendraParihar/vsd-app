import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JobSubCategoryModel } from '../models/job';
import {
  IBaseAdminUser,
  IJobSubCategoryList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageJobSubCategory,
  IJobSubCategory,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class JobSubCategoryService {
  constructor(@InjectModel(JobSubCategoryModel) private jobSubCategoryModel: typeof JobSubCategoryModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IJobSubCategoryList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          jobSubCategory: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.jobSubCategoryModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order:[["jobCategoryId","asc"],["jobSubCategory","asc"]],
    });
    const data = rows.map((data: JobSubCategoryModel) => {
      return <IJobSubCategoryList>{
        jobSubCategoryId: data.jobSubCategoryId,
        jobSubCategory: data.jobSubCategory,
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
    return <ITableList<IJobSubCategoryList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IJobSubCategory> {
    const obj = await this.jobSubCategoryModel.findOne({ where: { jobSubCategoryId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_JOB_SUB_CATEGORY));
    }
    return <IJobSubCategory>{
      ...obj,
      updatedBy: obj.updatedBy,
    };
  }

  async loadDetailById(id: number): Promise<IJobSubCategoryList> {
    const data = await this.jobSubCategoryModel.scope('list').findOne({
      where: { jobSubCategoryId: id },
    });

    return <IJobSubCategoryList>{
      jobSubCategoryId: data.jobSubCategoryId,
      jobSubCategory: data.jobSubCategory,
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

  async manage(obj: IManageJobSubCategory, userId: number) {
    const dataObj = {
      jobSubCategory: obj.jobSubCategory,
      jobCategoryId: obj.jobCategoryId,
      updatedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.jobSubCategoryId) {
      await this.jobSubCategoryModel.update(dataObj, { where: { jobSubCategoryId: obj.jobSubCategoryId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.jobSubCategoryModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.jobSubCategoryModel.findOne({ where: { jobSubCategoryId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
