import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FaqCategoryModel } from '../models/faq';
import {
  IBaseAdminUser,
  IFaqCategory,
  IFaqCategoryList,
  IManageFaqCategory,
  IStatusChange,
  ITableList,
  ITableListFilter,
  LabelKey,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class FaqCategoryService {
  constructor(@InjectModel(FaqCategoryModel) private faqCategoryModel: typeof FaqCategoryModel,
              private labelService: LabelService) {
  }

  async loadAllFaqs(): Promise<IFaqCategory[]> {
    const where = {};
    const rows = await this.faqCategoryModel.findAll({
      where: where,
      order: [['faqCategory', 'asc']],
    });
    return rows as IFaqCategory[];
  }

  async load(payload: ITableListFilter): Promise<ITableList<IFaqCategoryList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          faqCategory: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.faqCategoryModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['faqCategory', 'asc']],
    });
    const data = rows.map((data: FaqCategoryModel) => {
      return <IFaqCategoryList>{
        faqCategoryId: data.faqCategoryId,
        faqCategory: data.faqCategory,
        url: data.url,
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
    return <ITableList<IFaqCategoryList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IFaqCategory> {
    const obj = await this.faqCategoryModel.findOne({ where: { faqCategoryId: id }, nest: true, raw: true });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_FAQ_CATEGORY));
    }
    return <IFaqCategory>obj;
  }

  async loadDetailById(id: number): Promise<IFaqCategoryList> {
    const data = await this.faqCategoryModel.scope('list').findOne({
      where: { faqCategoryId: id },
    });
    return <IFaqCategoryList>{
      faqCategoryId: data.faqCategoryId,
      faqCategory: data.faqCategory,
      url: data.url,
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

  async manage(obj: IManageFaqCategory, userId: number) {
    const dataObj = {
      faqCategory: obj.faqCategory,
      url: obj.url,
      updatedBy: userId,
    };
    if (obj.faqCategoryId) {
      await this.faqCategoryModel.update(dataObj, { where: { faqCategoryId: obj.faqCategoryId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.faqCategoryModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.faqCategoryModel.findOne({ where: { faqCategoryId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
