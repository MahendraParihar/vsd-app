import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RelationshipModel } from '../models/family';
import {
  IBaseAdminUser,
  IRelationshipList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageRelationship,
  IRelationship,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class RelationshipService {
  constructor(@InjectModel(RelationshipModel) private relationshipModel: typeof RelationshipModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IRelationshipList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          relationship: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.relationshipModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order:[["relationship","asc"]],
    });
    const data = rows.map((data: RelationshipModel) => {
      return <IRelationshipList>{
        relationshipId: data.relationshipId,
        relationship: data.relationship,
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
    return <ITableList<IRelationshipList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IRelationship> {
    const obj = await this.relationshipModel.findOne({ where: { relationshipId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_RELATIONSHIP));
    }
    return <IRelationship>{
      ...obj,
      updatedBy: obj.updatedBy,
    };
  }

  async loadDetailById(id: number): Promise<IRelationshipList> {
    const data = await this.relationshipModel.scope('list').findOne({
      where: { relationshipId: id },
    });

    return <IRelationshipList>{
      relationshipId: data.relationshipId,
      relationship: data.relationship,
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

  async manage(obj: IManageRelationship, userId: number) {
    const dataObj = {
      relationship: obj.relationship,
      updatedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.relationshipId) {
      await this.relationshipModel.update(dataObj, { where: { relationshipId: obj.relationshipId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.relationshipModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.relationshipModel.findOne({ where: { relationshipId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }
}
