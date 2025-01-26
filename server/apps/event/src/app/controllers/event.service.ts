import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  IAddressDetail,
  IBaseAdminUser,
  IEvent,
  IEventList,
  IManageEvent,
  IStatusChange,
  ITableList,
  ITableListFilter,
  LabelKey,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { EventModel } from '../models/event.model';
import { AddressService, LabelService } from '@server/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class EventService {
  constructor(@InjectModel(EventModel) private eventModel: typeof EventModel,
              private labelService: LabelService,
              private sequelize: Sequelize,
              private addressService: AddressService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IEventList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          title: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.eventModel.scope('details').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['date', 'desc'], ['time', 'desc'], ['title', 'asc']],
    });
    const data = rows.map((data: EventModel) => {
      return this.formatObj(data);
    });
    return <ITableList<IEventList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IEvent> {
    const obj = await this.eventModel.scope('list').findOne({ where: { eventId: id }, raw: true, nest: true });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_EVENT));
    }
    console.log(obj);
    return <IEvent>{
      ...obj,
    };
  }

  async loadDetailById(id: number): Promise<IEventList> {
    const data = await this.eventModel.scope('list').findOne({
      where: { eventId: id },
    });

    return this.formatObj(data);
  }

  async manage(obj: IManageEvent, userId: number) {
    const transaction = await this.sequelize.transaction();
    try {
      const dataObj = {
        title: obj.title,
        description: obj.description,
        agenda: obj.agenda,
        date: obj.date,
        time: obj.time,
        tags: obj.tags,
        metaTitle: obj.metaTitle,
        metaDescription: obj.metaDescription,
        url: obj.url,
        updatedBy: userId,
        modifiedIp: ':0',
      };
      if (obj.imagePath) {
        Object.assign(dataObj, { imagePath: obj.imagePath });
      }

      let res;
      const address = await this.addressService.manage(obj.address, transaction, userId, ':0', ':0');
      obj.addressId = address.addressId;
      if (obj.eventId) {
        res = await this.eventModel.update(dataObj, { where: { eventId: obj.eventId }, transaction: transaction });
      } else {
        Object.assign(dataObj, { createdBy: userId });
        Object.assign(dataObj, { createdIp: ':0' });
        res = await this.eventModel.create(dataObj, { transaction: transaction });
      }
      await transaction.commit();
      return res;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.eventModel.findOne({ where: { eventId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }

  private formatObj(data: EventModel) {
    return <IEventList>{
      eventId: data.eventId,
      title: data.title,
      description: data.description,
      date: data.date,
      time: data.time,
      active: data.active,
      createdAt: data.createdAt,
      createdBy: data.createdBy,
      updatedAt: data.updatedAt,
      updatedBy: data.updatedBy,
      imagePath: data.imagePath,
      tags: data.tags,
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
      url: data.url,
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
    };
  }
}
