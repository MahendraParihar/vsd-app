import {Inject, Injectable} from '@nestjs/common';
import {CommonService} from '../common/common.service';
import {IServerResponse} from '../../common-dto/response-interface';
import {ServerResponseEnum} from '../../enums/server-response-enum';
import {StringResource} from '../../enums/string-resource';
import {
  ADMIN_USER_SHORT_INFO_ATTRIBUTE,
  DEFAULT_DATE_TIME_FORMAT,
  IS_DEV,
  TEMPLE_REPOSITORY
} from '../../constants/config-constants';
import {MstTemple} from '../../core/database/models/mst-temple.model';
import {MstAdminUser} from "../../core/database/models/mst-admin-user.model";
import * as moment from 'moment';
import {TempleInterface} from "../../response-interface/temple.interface";
import {GetDetailDto, UpdateActiveDto} from "../../common-dto/basic-input.dto";
import {CreateTempleDto, TempleSearchDto} from "./dto/temple.dto";
import {Sequelize} from "sequelize-typescript";
import {TableEnum} from "../../enums/table-enum";
import {AddressTypeEnum} from "../../enums/address-type-enum";
import {CommonFunctionsUtil} from "../../util/common-functions-util";
import {TxnAddress} from "../../core/database/models/txn-address.model";
import {MstCityVillage} from "../../core/database/models/mst-city-village.model";
import {MstDistrict} from "../../core/database/models/mst-district.model";
import {MstState} from "../../core/database/models/mst-state.model";
import {MstCountry} from "../../core/database/models/mst-country.model";

@Injectable()
export class TempleService {
  constructor(@Inject(TEMPLE_REPOSITORY) private readonly templeRepository: typeof MstTemple,
              private sequelize: Sequelize,
              private commonService: CommonService) {
  }

  public async findAll(searchDto: TempleSearchDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['templeName'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.templeRepository.count({
        where: whereCondition
      });

      const list = await this.templeRepository.findAll<MstTemple>({
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
        attributes: ['templeId', 'templeName', 'description', 'addressId', 'imagePath', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['templeName', 'ASC']
        ],
        offset: offset,
        limit: pageSize,
        raw: true
      });

      if (!list || list.length === 0) {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.NO_DATA_FOUND,
          data: null
        };
        return res;
      }

      const resList: TempleInterface[] = [];
      for (const s of list) {
        const iEvent: TempleInterface = {
          templeId: s.templeId,
          imagePath: CommonFunctionsUtil.getImagesObj(s.imagePath),
          active: s.active,
          templeName: s.templeName,
          createdBy: CommonFunctionsUtil.getAdminShortInfo(s['CreatedBy'], 'CreatedBy'),
          updatedBy: CommonFunctionsUtil.getAdminShortInfo(s['ModifiedBy'], 'ModifiedBy'),
          createdAt: moment(s.createdAt).format(DEFAULT_DATE_TIME_FORMAT),
          updatedAt: moment(s.updatedAt).format(DEFAULT_DATE_TIME_FORMAT)
        };
        resList.push(iEvent);
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

  public async fetchDetailById(lovObj: GetDetailDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.templeRepository.findOne<MstTemple>({
        attributes: ['templeId', 'templeName', 'imagePath', 'description'],
        where: {
          templeId: lovObj.id
        },
        raw: true
      });
      if (detailObj) {

        const obj = {
          ...detailObj,
          address: await this.commonService.findAddress(TableEnum.TXN_TEMPLE, lovObj.id)
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

  public async create(obj: CreateTempleDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    const t = await this.sequelize.transaction();
    try {

      const insertedData = await this.createData({
        templeName: obj.templeName,
        description: obj.description,
        imagePath: (obj.uploadFiles && obj.uploadFiles.length > 0) ? obj.uploadFiles : null,
        createdIp: ip,
        modifiedIp: ip,
        createdBy: adminId,
        modifiedBy: adminId,
      });

      // add address
      const addressObj = await this.commonService.addAddress({
        tableId: TableEnum.TXN_TEMPLE,
        pkOfTable: insertedData['templeId'],
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

      await this.templeRepository.update({
        addressId: addressObj['addressId']
      }, {
        where: {
          templeId: insertedData['templeId']
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

  public async update(id: number, obj: CreateTempleDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    const t = await this.sequelize.transaction();
    try {

      // update event
      await this.updateData(id, {
        templeName: obj.templeName,
        description: obj.description,
        imagePath: (obj.uploadFiles && obj.uploadFiles.length > 0) ? obj.uploadFiles : null,
        modifiedIp: ip,
        modifiedBy: adminId
      });

      // update address
      await this.commonService.updateAddressByTableNPkOfTable(TableEnum.TXN_TEMPLE, id, {
        tableId: TableEnum.TXN_TEMPLE,
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

  public async updateStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.templeRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId,
          modifiedIp: ip
        },
        {
          where: {
            templeId: obj.id
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

  private async createData(obj: any) {
    return await this.templeRepository.create(obj);
  }

  private async updateData(id: number, obj: any) {
    return await this.templeRepository.update(obj, {where: {templeId: id}});
  }
}
