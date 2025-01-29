import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  IAddressDetail,
  IBaseAdminUser,
  IFacility,
  IFacilityDetail,
  IFacilityList,
  IFacilityMemberInfo,
  IManageFacility,
  IStatusChange,
  ITableList,
  ITableListFilter,
  LabelKey,
} from '@vsd-common/lib';
import { Op } from 'sequelize';
import { AddressService, LabelService, PostModel, PostService } from '@server/common';
import { Sequelize } from 'sequelize-typescript';
import { filter } from 'lodash';
import { FacilityModel } from '../models/facility.model';
import { FacilityMemberModel } from '../models/facility-member.model';

@Injectable()
export class FacilityService {
  constructor(@InjectModel(FacilityModel) private facilityModel: typeof FacilityModel,
              private labelService: LabelService,
              private sequelize: Sequelize,
              private addressService: AddressService,
              private postService: PostService) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IFacilityList>> {
    const where = {};
    if (payload.search) {
      Object.assign(where, {
        [Op.iLike]: {
          title: `%${payload.search}%`,
        },
      });
    }
    const { rows, count } = await this.facilityModel.scope('details').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['title', 'asc']],
    });
    const data = rows.map((data: FacilityModel) => {
      return this.formatFacility(data);
    });
    return <ITableList<IFacilityList>>{
      data: data,
      count: count,
    };
  }

  async getById(id: number): Promise<IFacility> {
    const obj = await this.facilityModel.scope('list').findOne({ where: { facilityId: id }, raw: true, nest: true });
    if (!obj) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_FACILITY));
    }
    return <IFacility>{
      ...obj,
    };
  }

  async loadHomeFacilities(): Promise<IFacilityList[]> {
    const data = await this.facilityModel.scope('details').findAll({
      where: {
        facilityId: 1,
      },
      order: [['title', 'asc']],
      limit: 4,
      nest: true,
    });

    return data.map((d) => {
      return this.formatFacility(d.get({ plain: true }));
    });
  }

  async loadDetailByUrl(url: string): Promise<IFacilityDetail> {
    const data = await this.facilityModel.scope('withMember').findOne({
      where: { url: url },
      nest: true,
    });

    const post: PostModel[] = await this.postService.masterPost();
    return this.formatFacility(data.get({ plain: true }), post);
  }

  async loadDetailById(id: number): Promise<IFacilityDetail> {
    const data = await this.facilityModel.scope('details').findOne({
      where: { facilityId: id },
    });

    if (!data) {
      throw Error(this.labelService.get(LabelKey.ITEM_NOT_FOUND_FACILITY));
    }

    return this.formatFacility(data);
  }

  async manage(obj: IManageFacility, userId: number) {
    const transaction = await this.sequelize.transaction();
    try {
      const dataObj = {
        title: obj.title,
        description: obj.description,
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
      if (obj.facilityId) {
        res = await this.facilityModel.update(dataObj, {
          where: { facilityId: obj.facilityId },
          transaction: transaction,
        });
      } else {
        Object.assign(dataObj, { createdBy: userId });
        Object.assign(dataObj, { createdIp: ':0' });
        res = await this.facilityModel.create(dataObj, { transaction: transaction });
      }
      await transaction.commit();
      return res;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.facilityModel.findOne({ where: { facilityId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }

  private formatFacility(data: FacilityModel, post: PostModel[] = []) {
    const facilityMembers: IFacilityMemberInfo[] = [];
    for (const p of post) {
      const members: FacilityMemberModel[] = filter(data.facilityMembers, { postId: p.postId });
      if (members && members.length > 0) {
        const s: IFacilityMemberInfo = {
          post: p.post,
          members: [],
        };
        for (const member of members) {
          s.members.push({
            firstName: member.family.firstName,
            lastName: member.family.lastName,
            middleName: member.family.middleName,
            imagePath: member.family.imagePath && member.family.imagePath.length > 0 ? member.family.imagePath[0] : null,
            cityVillage: member.family.address ? member.family.address.cityVillage.cityVillage : null,
          });
        }
        facilityMembers.push(s);
      }
    }
    return <IFacilityDetail>{
      facilityId: data.facilityId,
      title: data.title,
      description: data.description,
      facilityMembers: facilityMembers,
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
