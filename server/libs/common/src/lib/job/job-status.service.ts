import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JobStatusModel } from '../models/job';
import {
  IBaseAdminUser,
  IJobStatusList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageJobStatus,
  IJobStatus,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class JobStatusService {
  constructor(@InjectModel(JobStatusModel) private jobStatusModel: typeof JobStatusModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IJobStatusList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          jobCategory: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.jobStatusModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order:[["jobStatus","asc"]],
    });
    const data = rows.map((data: JobStatusModel) => {
      return <IJobStatusList>{
        jobStatusId: data.jobStatusId,
        jobStatus: data.jobStatus,
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
    return <ITableList<IJobStatusList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IJobStatus> {
    const obj = await this.jobStatusModel.findOne({ where: { jobStatusId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_JOB_STATUS));
    }
    return <IJobStatus>{
      ...obj,
      updatedBy: obj.updatedBy,
    };
  }

  async loadDetailById(id: number): Promise<IJobStatusList> {
    const data = await this.jobStatusModel.scope('list').findOne({
      where: { jobStatusId: id },
    });

    return <IJobStatusList>{
      jobStatusId: data.jobStatusId,
      jobStatus: data.jobStatus,
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

  async manage(obj: IManageJobStatus, userId: number) {
    const dataObj = {
      jobStatus: obj.jobStatus,
      updatedBy: userId,
    };
    if (obj.jobStatusId) {
      await this.jobStatusModel.update(dataObj, { where: { jobStatusId: obj.jobStatusId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.jobStatusModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.jobStatusModel.findOne({ where: { jobStatusId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
