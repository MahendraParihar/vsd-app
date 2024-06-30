import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { INewsList, IBaseAdminUser,IStatusChange, ITableListFilter, ITableList } from '@vsd-common/lib';
import { Op } from 'sequelize';
import { CurrentAffairModel } from '../models/current-affair.model';

@Injectable()
export class NewsService {
  constructor(@InjectModel(CurrentAffairModel) private currentAffairModel: typeof CurrentAffairModel) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<INewsList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          title: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.currentAffairModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
    });
    const data = rows.map((data: CurrentAffairModel) => {
      return <INewsList>{
        currentAffairId: data.currentAffairId,
        isApproved: data.isApproved,
        imagePath: data.imagePath,
        title: data.title,
        description: data.description,
        date: data.date,
        time: data.time,
        tags: data.tags,
        visitedCount: data.visitedCount,
        commentApplicable: data.commentApplicable,
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
        approvedByUser: <IBaseAdminUser>{
          firstName: data.approvedByUser.firstName,
          lastName: data.approvedByUser.lastName,
        },
      };
    });
    return <ITableList<INewsList>>{
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
    const obj = await this.currentAffairModel.findOne({ where: { currentAffairId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
