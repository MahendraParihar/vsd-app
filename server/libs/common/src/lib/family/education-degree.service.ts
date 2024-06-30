import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { EducationDegreeModel } from '../models/family';
import {
  IBaseAdminUser,
  IEducationDegreeList,
  ITableListFilter,
  ITableList,
  LabelKey,
  IStatusChange,
  IManageEducationDegree,
  IEducationDegree,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { LabelService } from '../label';

@Injectable()
export class EducationDegreeService {
  constructor(@InjectModel(EducationDegreeModel) private educationDegreeModel: typeof EducationDegreeModel,
              private labelService: LabelService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IEducationDegreeList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          degree: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.educationDegreeModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
    });
    const data = rows.map((data: EducationDegreeModel) => {
      return <IEducationDegreeList>{
        educationDegreeId: data.educationDegreeId,
        degree: data.degree,
        imagePath: data.imagePath,
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
    return <ITableList<IEducationDegreeList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IEducationDegree> {
    const obj = await this.educationDegreeModel.findOne({ where: { educationDegreeId: id } });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_EDUCATION_DEGREE));
    }
    return <IEducationDegree>{
      ...obj,
      updatedBy: obj.modifiedBy,
    };
  }

  async loadDetailById(id: number): Promise<IEducationDegreeList> {
    const data = await this.educationDegreeModel.scope('list').findOne({
      where: { educationDegreeId: id },
    });

    return <IEducationDegreeList>{
      educationDegreeId: data.educationDegreeId,
      degree: data.degree,
      imagePath: data.imagePath,
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

  async manage(obj: IManageEducationDegree, userId: number) {
    const dataObj = {
      degree: obj.degree,
      modifiedBy: userId,
    };
    if (obj.imagePath) {
      Object.assign(dataObj, { imagePath: obj.imagePath });
    }
    if (obj.educationDegreeId) {
      await this.educationDegreeModel.update(dataObj, { where: { educationDegreeId: obj.educationDegreeId } });
    } else {
      Object.assign(dataObj, { createdBy: userId });
      await this.educationDegreeModel.create(dataObj);
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.educationDegreeModel.findOne({ where: { educationDegreeId: id } });
    obj.active = body.status;
    obj.modifiedBy = userId;
    await obj.save();
  }
}
