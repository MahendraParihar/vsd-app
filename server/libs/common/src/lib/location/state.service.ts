import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { StateModel } from '../models/location';
import {
  IBaseAdminUser,
  IManageState,
  IStateList,
  IStatusChange,
  ITableList,
  ITableListFilter,
  IState,
  LabelKey,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class StateService {
  constructor(@InjectModel(StateModel) private stateModel: typeof StateModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IStateList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          state: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.stateModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order:[['countryId','asc'],['state','asc']]
    });
    const data = rows.map((data: StateModel) => {
      return <IStateList>{
        stateId: data.stateId,
        state: data.state,
        country: data.country.country,
        countryId: data.countryId,
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
    return <ITableList<IStateList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IState> {
    const obj = await this.stateModel.findOne({ where: { stateId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_STATE));
    }
    return <IState>{
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<IStateList> {
    const data = await this.stateModel.scope('list').findOne({
      where: { stateId: id },
    });

    return <IStateList>{
      stateId: data.stateId,
      state: data.state,
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

  async manage(obj: IManageState, userId: number) {
    const dataObj = {
      state: obj.state,
      countryId: obj.countryId,
      code: obj.code,
      modifiedBy: userId,
    };
    if (obj.stateId) {
      await this.stateModel.update(dataObj, { where: { stateId: obj.stateId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.stateModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.stateModel.findOne({ where: { stateId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
