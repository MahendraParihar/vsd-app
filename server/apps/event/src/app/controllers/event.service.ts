import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {
  IEventList,
  IBaseAdminUser,
  IStatusChange,
  ITableListFilter,
  ITableList,
  LabelKey,
  IManageEvent, IEvent
} from '@vsd-common/lib';
import {Op} from 'sequelize';
import {EventModel} from "../models/event.model";
import {LabelService} from "@server/common";

@Injectable()
export class EventService {
  constructor(@InjectModel(EventModel) private eventModel: typeof EventModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IEventList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          mandalName: `%${payload.search}%`,
        },
      });
    }
    const {rows, count} = await this.eventModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['date', 'desc'], ['time', 'desc'], ['title', 'asc']]
    });
    const data = rows.map((data: EventModel) => {
      return <IEventList>{
        eventId: data.eventId,
        title: data.title,
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
    return <ITableList<IEventList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IEvent> {
    const obj = await this.eventModel.findOne({where: {eventId: id}});
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_EVENT));
    }
    return <IEvent>{
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<IEventList> {
    const data = await this.eventModel.scope('list').findOne({
      where: {eventId: id}
    });

    return <IEventList>{
      eventId: data.eventId,
      title: data.title,
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
  }

  async manage(obj: IManageEvent, userId: number) {
    const dataObj = {
      title: obj.title,
      modifiedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, {imagePath: obj.imagePath});
    }
    if (obj.eventId) {
      await this.eventModel.update(dataObj, {where: {eventId: obj.eventId}});
    } else {
      Object.assign(dataObj, {createdBy: userId});
      await this.eventModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.eventModel.findOne({where: {eventId: id}});
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
