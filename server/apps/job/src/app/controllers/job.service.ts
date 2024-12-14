import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {
  IBaseAdminUser,
  IJob,
  IJobList,
  IManageJob,
  IStatusChange,
  ITableList,
  ITableListFilter,
  LabelKey
} from '@vsd-common/lib';
import {Op} from 'sequelize';
import {JobModel} from "../models/job.model";
import {LabelService} from "@server/common";

@Injectable()
export class JobService {
  constructor(@InjectModel(JobModel) private jobModel: typeof JobModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IJobList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          title: `%${payload.search}%`,
        },
      });
    }
    const {rows, count} = await this.jobModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['date', 'desc'], ['time', 'desc'], ['title', 'asc']]
    });
    const data = rows.map((data: JobModel) => {
      return <IJobList>{
        jobId: data.jobId,
        title: data.title,
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
    return <ITableList<IJobList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IJob> {
    const obj = await this.jobModel.findOne({where: {jobId: id}});
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_JOB));
    }
    return <IJob>{
      ...obj,
      updatedBy: obj.updatedBy,
    };
  }

  async loadDetailById(id: number) {
    const data = await this.jobModel.scope('list').findOne({
      where: {jobId: id}
    });
    return <IJobList>{
      jobId: data.jobId,
      title: data.title,
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

  async manage(obj: IManageJob, userId: number) {
    const dataObj = {
      title: obj.title,
      updatedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, {imagePath: obj.imagePath});
    }
    if (obj.jobId) {
      await this.jobModel.update(dataObj, {where: {jobId: obj.jobId}});
    } else {
      Object.assign(dataObj, {createdBy: userId});
      await this.jobModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.jobModel.findOne({where: {jobId: id}});
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
