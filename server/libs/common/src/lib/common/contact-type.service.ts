import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ContactTypeModel } from '../models/contact-type.model';
import {
  IContactTypeList,
  IBaseAdminUser,
  ITableListFilter,
  ITableList,
  IStatusChange,
  IManageContactType,
  IContactType,
  LabelKey,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class ContactTypeService {
  constructor(@InjectModel(ContactTypeModel) private contactTypeModel: typeof ContactTypeModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IContactTypeList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          contactType: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.contactTypeModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
    });
    const data = rows.map((data: ContactTypeModel) => {
      return <IContactTypeList>{
        contactTypeId: data.contactTypeId,
        contactType: data.contactType,
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
    return <ITableList<IContactTypeList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IContactType> {
    const obj = await this.contactTypeModel.findOne({ where: { contactTypeId: id }, nest:true, raw: true });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_CONTACT_TYPE));
    }
    return <IContactType>obj;
  }

  async loadDetailById(id: number) {
    const data = await this.contactTypeModel.scope('list').findOne({
      where: { contactTypeId: id },
    });

    return <IContactTypeList>{
      contactTypeId: data.contactTypeId,
      contactType: data.contactType,
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

  async manage(obj: IManageContactType, userId: number) {
    const dataObj = {
      contactType: obj.contactType,
      updatedBy: userId,
    };
    if (obj.contactTypeId) {
      await this.contactTypeModel.update(dataObj, { where: { contactTypeId: obj.contactTypeId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.contactTypeModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.contactTypeModel.findOne({ where: { contactTypeId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
