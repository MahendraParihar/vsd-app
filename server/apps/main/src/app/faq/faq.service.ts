import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  IBaseAdminUser,
  IFaq,
  IFaqList,
  IManageFaq,
  IStatusChange,
  ITableList,
  ITableListFilter,
  LabelKey,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '@server/common';
import { Sequelize } from 'sequelize-typescript';
import { FaqModel } from './models/faq.model';

@Injectable()
export class FaqService {
  constructor(@InjectModel(FaqModel) private faqModel: typeof FaqModel,
              private labelService: LabelService,
              private sequelize: Sequelize) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IFaqList>> {
    const where = {};
    if (payload.search) {
      payload.search = payload.search.toLowerCase();
      Object.assign(where, {
        [Op.or]: [
          { faq: { [Op.iLike]: `%${payload.search}%` } },
          { answer: { [Op.iLike]: `%${payload.search}%` } },
        ],
      });
    }
    const { rows, count } = await this.faqModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['faqCategoryId', 'desc'], ['faq', 'desc'], ['answer', 'desc']],
    });
    const data = rows.map((data: FaqModel) => {
      return this.formatFaq(data.get({ plain: true }));
    });
    return <ITableList<IFaqList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IFaq> {
    const obj = await this.faqModel.scope('list').findOne({ where: { faqId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_FAQ));
    }
    const tempObj = obj.get({ plain: true });
    return <IFaq>tempObj;
  }

  async manage(obj: IManageFaq, userId: number) {
    const transaction = await this.sequelize.transaction();
    try {
      const dataObj = {
        faqCategoryId: obj.faqCategoryId,
        faq: obj.faq,
        answer: obj.answer,
        updatedBy: userId,
        modifiedIp: ':0',
      };
      let res;
      if (obj.faqId) {
        res = await this.faqModel.update(dataObj, { where: { faqId: obj.faqId }, transaction: transaction });
      } else {
        Object.assign(dataObj, { createdBy: userId });
        Object.assign(dataObj, { createdIp: ':0' });
        res = await this.faqModel.create(dataObj, { transaction: transaction });
        obj.faqId = res.faqId;
      }
      await transaction.commit();
      return res;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.faqModel.findOne({ where: { faqId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }

  private formatFaq(data: FaqModel) {
    return <IFaqList>{
      faqId: data.faqId,
      faqCategoryId: data.faqCategoryId,
      faqCategory: data.faqCategory.faqCategory,
      faq: data.faq,
      answer: data.answer,
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
}
