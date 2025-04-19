import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  AppConfigEnum,
  IBaseAdminUser,
  IManageNews,
  INews,
  INewsList,
  IStatusChange,
  ITableList,
  ITableListFilter,
  LabelKey,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { CurrentAffairModel } from '../models/current-affair.model';
import { AppConfigService, buildImageUrl, LabelService } from '@server/common';

@Injectable()
export class NewsService {
  constructor(@InjectModel(CurrentAffairModel) private currentAffairModel: typeof CurrentAffairModel,
              private readonly appConfigService: AppConfigService,
              private labelService: LabelService) {
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
      order: [['date', 'desc'], ['time', 'desc'], ['title', 'asc']],
    });
    const data = rows.map((data: CurrentAffairModel) => {
      return <INewsList>{
        currentAffairId: data.currentAffairId,
        isApproved: data.isApproved,
        imagePath: buildImageUrl(data.imagePath, this.appConfigService.getString(AppConfigEnum.CLIENT_URL)),
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
        updatedBy: data.updatedBy,
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

  async getById(id: number): Promise<INews> {
    const obj = await this.currentAffairModel.findOne({ where: { currentAffairId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_NEWS));
    }
    return <INews>{
      ...obj,
      updatedBy: obj.updatedBy,
    };
  }

  async loadDetailById(id: number) {
  }

  async manage(obj: IManageNews, userId: number) {
    const dataObj = {
      title: obj.title,
      updatedBy: userId,
      tags: obj.tags,
      metaTitle: obj.metaTitle,
      metaDescription: obj.metaDescription,
      url: obj.url,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.currentAffairId) {
      await this.currentAffairModel.update(dataObj, { where: { currentAffairId: obj.currentAffairId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.currentAffairModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.currentAffairModel.findOne({ where: { currentAffairId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
