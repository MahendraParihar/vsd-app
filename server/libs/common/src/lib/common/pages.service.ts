import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  IBaseAdminUser,
  ILegalPage,
  ILegalPageList,
  IManageLegalPage,
  IStatusChange,
  ITableList,
  LabelKey,
} from '@vsd-common/lib';
import { LabelService } from '../label';
import { LegalPagesModel } from '../models/legal-pages.model';

@Injectable()
export class PagesService {
  constructor(@InjectModel(LegalPagesModel) private legalPagesModel: typeof LegalPagesModel,
              private labelService: LabelService) {
  }

  async load(): Promise<ITableList<ILegalPageList>> {
    const { rows, count } = await this.legalPagesModel.scope('list').findAndCountAll();
    const data = rows.map((data: LegalPagesModel) => {
      return <ILegalPageList>{
        legalPageId: data.legalPageId,
        title: data.title,
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
    return <ITableList<ILegalPageList>>{
      data: data,
      count: count,
    };
  }

  async getById(page: string): Promise<ILegalPage> {
    let id = 1;
    switch (page) {
      case 'about-us':
        id = 2;
        break;
      case 'history':
        id = 1;
        break;
    }
    const obj = await this.legalPagesModel.findOne({ where: { legalPageId: id }, raw: true, nest: true });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_PAGE));
    }
    return <ILegalPage>obj;
  }

  async loadDetailById(id: number) {
    const data = await this.legalPagesModel.scope('list').findOne({
      where: { legalPageId: id },
    });

    return <ILegalPageList>{
      legalPageId: data.legalPageId,
      title: data.title,
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

  async manage(obj: IManageLegalPage, userId: number) {
    const dataObj = {
      title: obj.title,
      details: obj.details,
      updatedBy: userId,
    };
    if (obj.legalPageId) {
      await this.legalPagesModel.update(dataObj, { where: { legalPageId: obj.legalPageId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.legalPagesModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.legalPagesModel.findOne({ where: { legalPageId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
