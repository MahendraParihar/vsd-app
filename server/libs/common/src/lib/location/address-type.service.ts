import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddressTypeModel } from '../models/location';
import {
  IAddressType,
  IAddressTypeList,
  IBaseAdminUser,
  IManageAddressType,
  IStatusChange,
  ITableList,
  ITableListFilter,
  LabelKey,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class AddressTypeService {
  constructor(@InjectModel(AddressTypeModel) private addressTypeModel: typeof AddressTypeModel,
              private labelService: LabelService) {
  }

  async loadAll(): Promise<IAddressType[]> {
    return (await this.addressTypeModel.findAll({
      where: { active: true },
      raw: true,
      nest: true,
    })) as IAddressType[];
  }

  async load(payload: ITableListFilter): Promise<ITableList<IAddressTypeList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          addressType: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.addressTypeModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
    });
    const data = rows.map((data: AddressTypeModel) => {
      return <IAddressTypeList>{
        addressTypeId: data.addressTypeId,
        addressType: data.addressType,
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
    return <ITableList<IAddressTypeList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number) {
    const obj = await this.addressTypeModel.findOne({ where: { addressTypeId: id }, nest: true, raw: true });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_ADDRESS_TYPE));
    }
    return <IAddressType>obj;
  }

  async loadDetailById(id: number) {
    const data = await this.addressTypeModel.scope('list').findOne({
      where: { addressTypeId: id },
    });
    return <IAddressTypeList>{
      addressTypeId: data.addressTypeId,
      addressType: data.addressType,
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

  async manage(obj: IManageAddressType, userId: number) {
    const dataObj = {
      addressType: obj.addressType,
      updatedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.addressTypeId) {
      await this.addressTypeModel.update(dataObj, { where: { addressTypeId: obj.addressTypeId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.addressTypeModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.addressTypeModel.findOne({ where: { addressTypeId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
