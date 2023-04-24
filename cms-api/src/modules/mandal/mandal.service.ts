import {Inject, Injectable} from '@nestjs/common';
import {MstMandal} from '../../core/database/models/mst-mandal.model';
import {TxnMandalMember} from '../../core/database/models/txn-mandal-member.model';
import {CommonService} from '../common/common.service';
import {IServerResponse} from '../../common-dto/response-interface';
import {ServerResponseEnum} from '../../enums/server-response-enum';
import {StringResource} from '../../enums/string-resource';
import {
  ADMIN_USER_SHORT_INFO_ATTRIBUTE,
  DEFAULT_DATE_TIME_FORMAT,
  IS_DEV,
  MANDAL_MEMBER_REPOSITORY,
  MANDAL_REPOSITORY,
  TRUSTEE_REPOSITORY
} from '../../constants/config-constants';
import {TxnTrustee} from '../../core/database/models/txn-trustee.model';
import {TableEnum} from '../../enums/table-enum';
import {MandalInterface} from '../../response-interface/mandal.interface';
import {MstAdminUser} from "../../core/database/models/mst-admin-user.model";
import * as moment from 'moment';
import {BasicSearchDto, GetDetailDto, UpdateActiveDto} from "../../common-dto/basic-input.dto";
import {CreateMandalMemberDto, MandalMemberSearchDto} from "./dto/mandal-member.dto";
import {CreateMandalDto} from "./dto/mandal.dto";
import {Sequelize} from "sequelize-typescript";
import {AddressTypeEnum} from "../../enums/address-type-enum";
import {CommonFunctionsUtil} from "../../util/common-functions-util";

@Injectable()
export class MandalService {
  constructor(@Inject(MANDAL_REPOSITORY) private readonly mandalRepository: typeof MstMandal,
              @Inject(MANDAL_MEMBER_REPOSITORY) private readonly mandalMemberRepository: typeof TxnMandalMember,
              @Inject(TRUSTEE_REPOSITORY) private readonly trusteeRepository: typeof TxnTrustee,
              private sequelize: Sequelize,
              private commonService: CommonService) {
  }

  // region mandal
  public async findAllMandal(searchDto: BasicSearchDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {

      let whereCondition = {};
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.mandalRepository.count({
        where: whereCondition
      });

      const list = await this.mandalRepository.findAll<MstMandal>({
        include: [
          {
            model: MstAdminUser,
            required: false,
            as: 'CreatedBy',
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            required: false,
            as: 'ModifiedBy',
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          }
        ],
        attributes: ['mandalId', 'mandal', 'addressId', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        offset: offset,
        limit: pageSize
      });

      if (!list || list.length === 0) {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.NO_MANDAL_FOUND,
          data: null
        };
        return res;
      }

      const resList: MandalInterface[] = [];

      for (const s of list) {
        const iObj: MandalInterface = {
          mandalId: s.mandalId,
          mandal: s.mandal,
          active: s.active,
          createdBy: CommonFunctionsUtil.getAdminShortInfo(s['CreatedBy'],'CreatedBy'),
          updatedBy: CommonFunctionsUtil.getAdminShortInfo(s['ModifiedBy'],'ModifiedBy'),
          createdAt: moment(s.createdAt).format(DEFAULT_DATE_TIME_FORMAT),
          updatedAt: moment(s.updatedAt).format(DEFAULT_DATE_TIME_FORMAT)
        };
        iObj.address = await this.commonService.findAddress(TableEnum.MST_MANDAL, s.mandalId);
        resList.push(iObj);
      }

      res = {
        code: ServerResponseEnum.SUCCESS,
        message: StringResource.SUCCESS,
        data: {
          list: resList,
          count: totalCount
        }
      };

      return res;

    } catch (e) {
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async fetchMandalDetailById(lovObj: GetDetailDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.mandalRepository.findOne<MstMandal>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          mandalId: lovObj.id
        },
        raw: true
      });
      if (detailObj) {

        const obj = {
          ...detailObj,
          address: await this.commonService.findAddress(TableEnum.MST_MANDAL, lovObj.id)
        }

        res = {
          code: ServerResponseEnum.SUCCESS,
          message: StringResource.SUCCESS,
          data: obj
        };
      } else {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.NO_DATA_FOUND,
          data: null
        };
      }
      return res;
    } catch (e) {
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async createMandal(obj: CreateMandalDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    const t = await this.sequelize.transaction();
    try {
      const insertedData = await this.createData({
        mandal: obj.mandal,
        createdIp: ip,
        modifiedIp: ip,
        createdBy: adminId,
        modifiedBy: adminId,
      });

      // add address
      const addObj = await this.commonService.addAddress({
        tableId: TableEnum.MST_MANDAL,
        pkOfTable: insertedData['mandalId'],
        addressTypeId: AddressTypeEnum.COMMUNICATION_ADDRESS,
        address: obj.address.address,
        pinCode: obj.address.pinCode,
        cityVillageId: obj.address.cityVillageId,
        districtId: obj.address.districtId,
        stateId: obj.address.stateId,
        countryId: obj.address.countryId,
        latitude: obj.address.latitude,
        longitude: obj.address.longitude,
        createdIp: ip,
        modifiedIp: ip
      });

      await this.mandalRepository.update({
        addressId: addObj['addressId']
      }, {
        where: {
          mandalId: insertedData['mandalId']
        }
      });

      await t.commit();
      res = {
        code: ServerResponseEnum.SUCCESS,
        message: StringResource.SUCCESS,
        data: null
      };
      return res;

    } catch (e) {
      await t.rollback();
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async updateMandal(id: number, obj: CreateMandalDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    const t = await this.sequelize.transaction();
    try {
      // update event
      await this.updateData(id, {
        mandal: obj.mandal,
        modifiedIp: ip,
        modifiedBy: adminId
      });

      // update address
      await this.commonService.updateAddressByTableNPkOfTable(TableEnum.TXN_EVENT, id, {
        tableId: TableEnum.MST_MANDAL,
        pkOfTable: id,
        addressTypeId: AddressTypeEnum.COMMUNICATION_ADDRESS,
        address: obj.address.address,
        pinCode: obj.address.pinCode,
        cityVillageId: obj.address.cityVillageId,
        districtId: obj.address.districtId,
        stateId: obj.address.stateId,
        countryId: obj.address.countryId,
        latitude: obj.address.latitude,
        longitude: obj.address.longitude,
        modifiedIp: ip
      });

      await t.commit();
      res = {
        code: ServerResponseEnum.SUCCESS,
        message: StringResource.SUCCESS,
        data: null
      };
      return res;
    } catch (e) {
      await t.rollback();
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async updateMandalStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.mandalMemberRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId,
          modifiedIp: ip
        },
        {
          where: {
            mandalId: obj.id
          }
        }
      );
      if (queryRes) {
        res = {
          code: ServerResponseEnum.SUCCESS,
          message: StringResource.SUCCESS,
          data: null
        };
      } else {
        res = {
          code: ServerResponseEnum.ERROR,
          message: StringResource.SOMETHING_WENT_WRONG,
          data: null
        }
      }
      return res;
    } catch (e) {
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  //endregion

  // region member member
  public async findAllMandalMember(searchDto: MandalMemberSearchDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const list = [];

      if (!list || list.length === 0) {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.NO_TRUSTEE_FOUND,
          data: null
        };
        return res;
      }

      res = {
        code: ServerResponseEnum.SUCCESS,
        message: StringResource.SUCCESS,
        data: list
      };

      return res;

    } catch (e) {
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async fetchMandalMemberDetailById(lovObj: GetDetailDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.mandalMemberRepository.findOne<TxnMandalMember>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          madalMemberId: lovObj.id
        }
      });
      if (detailObj) {
        res = {
          code: ServerResponseEnum.SUCCESS,
          message: StringResource.SUCCESS,
          data: detailObj
        };
      } else {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.NO_DATA_FOUND,
          data: null
        };
      }
      return res;
    } catch (e) {
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async createMandalMember(obj: CreateMandalMemberDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      return res;
    } catch (e) {
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async updateMandalMember(obj: CreateMandalMemberDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      return res;
    } catch (e) {
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async updateMandalMemberStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.mandalMemberRepository.update(
        {
          active: obj.active
        },
        {
          where: {
            madalMemberId: obj.id
          }
        }
      );
      if (queryRes) {
        res = {
          code: ServerResponseEnum.SUCCESS,
          message: StringResource.SUCCESS,
          data: null
        };
      } else {
        res = {
          code: ServerResponseEnum.ERROR,
          message: StringResource.SOMETHING_WENT_WRONG,
          data: null
        }
      }
      return res;
    } catch (e) {
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  //endregion

  private async createData(obj: any) {
    return await this.mandalRepository.create(obj);
  }

  private async updateData(id: number, obj: any) {
    return await this.mandalRepository.update(obj, {where: {mandalId: id}});
  }
}

