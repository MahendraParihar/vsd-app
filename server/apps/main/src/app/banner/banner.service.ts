import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  AppConfigEnum,
  IBanner,
  IBannerList,
  IBaseAdminUser,
  IManageBanner,
  IStatusChange,
  ITableList,
  ITableListFilter,
  LabelKey,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { AppConfigService, buildImageUrl, LabelService } from '@server/common';
import { Sequelize } from 'sequelize-typescript';
import { BannerModel } from './models/banner.model';

@Injectable()
export class BannerService {
  constructor(@InjectModel(BannerModel) private bannerModel: typeof BannerModel,
              private labelService: LabelService,
              private appConfigService: AppConfigService,
              private sequelize: Sequelize) {
  }

  async load(payload: ITableListFilter, bannerFor: string = null): Promise<ITableList<IBannerList>> {
    const where = {};
    if (payload.search) {
      payload.search = payload.search.toLowerCase();
      Object.assign(where, {
        [Op.or]: [
          { title: { [Op.iLike]: `%${payload.search}%` } },
          { subTitle: { [Op.iLike]: `%${payload.search}%` } },
        ],
      });
    }
    if (bannerFor) {
      Object.assign(where, { bannerFor: bannerFor });
    }
    const { rows, count } = await this.bannerModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['fromDate', 'desc'], ['toDate', 'desc'], ['title', 'asc']],
    });
    const data = rows.map((data: BannerModel) => {
      return this.formatBanner(data.get({ plain: true }));
    });
    return <ITableList<IBannerList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IBanner> {
    const obj = await this.bannerModel.scope('list').findOne({ where: { bannerId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_BANNER));
    }

    const tempObj = obj.get({ plain: true });

    return <IBanner>tempObj;
  }

  async manage(obj: IManageBanner, userId: number) {
    const transaction = await this.sequelize.transaction();
    try {
      const dataObj = {
        title: obj.title,
        subTitle: obj.subTitle,
        isInternalUrl: obj.isInternalUrl,
        bannerFor: obj.bannerFor,
        url: obj.url,
        fromDate: obj.fromDate,
        toDate: obj.toDate,
        updatedBy: userId,
        modifiedIp: ':0',
      };
      if (obj.imagePath) {
        Object.assign(dataObj, { imagePath: obj.imagePath });
      }

      let res;
      if (obj.bannerId) {
        res = await this.bannerModel.update(dataObj, { where: { bannerId: obj.bannerId }, transaction: transaction });
      } else {
        Object.assign(dataObj, { createdBy: userId });
        Object.assign(dataObj, { createdIp: ':0' });
        res = await this.bannerModel.create(dataObj, { transaction: transaction });
        obj.bannerId = res.bannerId;
      }
      await transaction.commit();
      return res;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.bannerModel.findOne({ where: { bannerId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }

  private formatBanner(data: BannerModel) {
    return <IBannerList>{
      bannerId: data.bannerId,
      title: data.title,
      subTitle: data.subTitle,
      isInternalUrl: data.isInternalUrl,
      bannerFor: data.bannerFor,
      url: data.url,
      fromDate: data.fromDate,
      toDate: data.toDate,
      active: data.active,
      createdAt: data.createdAt,
      createdBy: data.createdBy,
      updatedAt: data.updatedAt,
      updatedBy: data.updatedBy,
      imagePath: buildImageUrl([data.imagePath], this.appConfigService.getString(AppConfigEnum.CLIENT_URL))[0],
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
}
