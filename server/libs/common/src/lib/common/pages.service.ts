import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  IBaseAdminUser,
  ILegalPage,
  ILegalPageList,
  IManageLegalPage,
  IStatusChange,
  ITableList,
  ITableListFilter,
  LabelKey,
} from '@vsd-common/lib';
import { LabelService } from '../label';
import { LegalPagesModel } from '../models/legal-pages.model';
import { Op } from 'sequelize';

@Injectable()
export class PagesService {
  constructor(@InjectModel(LegalPagesModel) private legalPagesModel: typeof LegalPagesModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<ILegalPageList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          title: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.legalPagesModel.scope('details').findAndCountAll(
      {
        where: where,
        limit: payload.limit,
        offset: payload.limit * payload.page,
        order: [['title', 'asc']],
      },
    );
    const data = rows.map((data: LegalPagesModel) => {
      return this.formatPage(data);
    });
    return <ITableList<ILegalPageList>>{
      data: data,
      count: count,
    };
  }

  async getByUrl(page: string): Promise<ILegalPageList> {
    let id = 1;
    switch (page) {
      case 'about-us':
        id = 2;
        break;
      case 'history':
        id = 1;
        break;
    }
    return this.loadDetailById(id);
  }

  async getById(id: number): Promise<IManageLegalPage> {
    const obj = await this.legalPagesModel.findOne({ where: { legalPageId: id }, raw: true, nest: true });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_PAGE));
    }
    return <IManageLegalPage>obj;
  }

  async loadDetailById(id: number) {
    const data = await this.legalPagesModel.scope('details').findOne({
      where: { legalPageId: id },
      raw: true, nest: true,
    });

    return <ILegalPageList>this.formatPage(data);
  }

  async manage(obj: IManageLegalPage, userId: number, requestedIp: string): Promise<ILegalPage> {
    const dataObj = {
      title: obj.title,
      details: obj.details,
      updatedBy: userId,
      tags: obj.tags,
      metaTitle: obj.metaTitle,
      metaDescription: obj.metaDescription,
      url: obj.url,
      modifiedIp: requestedIp,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    let res;
    if (obj.legalPageId) {
      Object.assign(dataObj, { createdIp: requestedIp });
      res = await this.legalPagesModel.update(dataObj, { where: { legalPageId: obj.legalPageId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      Object.assign(dataObj, { createdIp: requestedIp });
      res = await this.legalPagesModel.create(dataObj);
    }
    return res;
  }

  async updateStatus(id: number, body: IStatusChange, userId: number, requestedIp: string) {
    const obj = await this.legalPagesModel.findOne({ where: { legalPageId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    obj.modifiedIp = requestedIp;
    await obj.save();
  }

  private formatPage(data: LegalPagesModel) {
    return <ILegalPageList>{
      legalPageId: data.legalPageId,
      title: data.title,
      details: data.details,
      imagePath: data.imagePath,
      tags: data.tags,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
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
}
