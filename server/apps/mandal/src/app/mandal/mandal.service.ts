import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  IAddressDetail,
  IBaseAdminUser,
  IManageMandal,
  IMandal,
  IMandalAdditionalInfo,
  IMandalDetail,
  IMandalList,
  IStatusChange,
  ITableList,
  ITableListFilter,
  LabelKey,
} from '@vsd-common/lib';
import { MandalModel } from '../models/mandal.model';
import { Op } from 'sequelize';
import { LabelService } from '@server/common';

@Injectable()
export class MandalService {
  constructor(@InjectModel(MandalModel) private mandalModel: typeof MandalModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IMandalList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          mandalName: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.mandalModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['mandalName', 'asc']],
    });
    const data = rows.map((data: MandalModel) => {
      return <IMandalList>{
        mandalId: data.mandalId,
        mandalName: data.mandalName,
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
      };
    });
    return <ITableList<IMandalList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IMandal> {
    const obj = await this.mandalModel.findOne({ where: { mandalId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_MANDAL));
    }
    return <IMandal>{
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<IMandalDetail> {
    console.log('-------------------------', id);
    const data = await this.mandalModel.scope('details').findOne({
      where: { mandalId: id },
    });

    if (!data) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_MANDAL));
    }

    return <IMandalDetail>{
      mandalId: data.mandalId,
      mandalName: data.mandalName,
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
      address: <IAddressDetail>{
        address: data.address.address,
        pinCode: data.address.pinCode,
        latitude: data.address.latitude,
        longitude: data.address.longitude,
        country: data.address.country.country,
        state: data.address.state.state,
        district: data.address.district.district,
        cityVillage: data.address.cityVillage.cityVillage,
      },
      additionalInfo: data.additionalInfo as IMandalAdditionalInfo,
    };
  }

  async manage(obj: IManageMandal, userId: number) {
    const dataObj = {
      mandalName: obj.mandalName,
      modifiedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.mandalId) {
      await this.mandalModel.update(dataObj, { where: { mandalId: obj.mandalId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.mandalModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.mandalModel.findOne({ where: { mandalId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }

  async loadPrimaryMandalInfo(): Promise<IMandalDetail> {
    return await this.loadDetailById(12);
  }
}
