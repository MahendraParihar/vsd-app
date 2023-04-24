import {Inject, Injectable} from '@nestjs/common';
import {
  ADMIN_USER_SHORT_INFO_ATTRIBUTE,
  APP_USER_DEVICE_REPOSITORY,
  APP_USER_LOGIN_HISTORY_REPOSITORY,
  APP_USER_REPOSITORY,
  DEFAULT_DATE_TIME_FORMAT,
  IS_DEV
} from '../../constants/config-constants';
import {IServerResponse} from '../../common-dto/response-interface';
import {ServerResponseEnum} from '../../enums/server-response-enum';
import {StringResource} from '../../enums/string-resource';
import * as moment from 'moment';
import {Sequelize} from "sequelize-typescript";
import {TxnAppUser} from "../../core/database/models/txn-app-user.model";
import {TxnAppUserDevice} from "../../core/database/models/txn-app-user-device.model";
import {TxnAppUserLoginHistory} from "../../core/database/models/txn-app-user-login-history.model";
import {AppUserSearchDto, CreateAppUserDto} from "./dto/app-user.dto";
import {GetDetailDto, UpdateActiveDto} from "../../common-dto/basic-input.dto";
import {AppUserListInterface} from "../../response-interface/app-user.interface";
import {MstAdminUser} from "../../core/database/models/mst-admin-user.model";
import {MstCountry} from "../../core/database/models/mst-country.model";
import {MstState} from "../../core/database/models/mst-state.model";
import {MstDistrict} from "../../core/database/models/mst-district.model";
import {MstCityVillage} from "../../core/database/models/mst-city-village.model";
import {CommonFunctionsUtil} from "../../util/common-functions-util";

@Injectable()
export class AppUserService {
  constructor(@Inject(APP_USER_REPOSITORY) private readonly appUserRepository: typeof TxnAppUser,
              @Inject(APP_USER_DEVICE_REPOSITORY) private readonly appUserDeviceRepository: typeof TxnAppUserDevice,
              @Inject(APP_USER_LOGIN_HISTORY_REPOSITORY) private readonly appUserHistoryRepository: typeof TxnAppUserLoginHistory,
              private sequelize: Sequelize) {

  }

  public async findAll(searchDto: AppUserSearchDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {

      let whereCondition = {};
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.appUserRepository.count({
        where: whereCondition
      });

      const list = await this.appUserRepository.findAll<TxnAppUser>({
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
          },
          {
            model: MstCityVillage,
            as: 'AppUserCityVillage',
            required: true,
            attributes: ['cityVillage'],
            include: [
              {
                model: MstDistrict,
                as: 'CityVillageDistrict',
                required: true,
                attributes: ['district'],
                include: [
                  {
                    model: MstState,
                    as: 'DistrictState',
                    required: true,
                    attributes: ['state'],
                    include: [
                      {
                        model: MstCountry,
                        as: 'StateCountry',
                        required: true,
                        attributes: ['country']
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        attributes: ['appUserId', 'firstName', 'lastName',
          'emailId', 'contactNo', 'cityVillageId', 'appUserStatusId',
          'deactiveReason', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'
        ],
        where: whereCondition,
        order: [
          ['firstName', 'ASC'],
          ['lastName', 'ASC'],
        ],
        offset: offset,
        limit: pageSize
      });

      if (!list || list.length === 0) {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.NO_DATA_FOUND,
          data: null
        };
        return res;
      }

      const resList: AppUserListInterface[] = [];
      for (const s of list) {
        const iEvent: AppUserListInterface = {
          id: s.appUserId,
          firstName: s.firstName,
          lastName: s.lastName,
          cityVillage: s['AppUserCityVillage']['cityVillage'],
          district: s['AppUserCityVillage']['CityVillageDistrict']['district'],
          state: s['AppUserCityVillage']['CityVillageDistrict']['DistrictState']['state'],
          country: s['AppUserCityVillage']['CityVillageDistrict']['DistrictState']['StateCountry']['country'],
          createdBy: CommonFunctionsUtil.getAdminShortInfo(s['CreatedBy'],'CreatedBy'),
          updatedBy: CommonFunctionsUtil.getAdminShortInfo(s['ModifiedBy'],'ModifiedBy'),
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
      console.log(e);
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async fetchDetailById(currentAffairObj: GetDetailDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const currentAffair = await this.appUserRepository.findOne<TxnAppUser>({
        attributes: [
          'eventId', 'title', 'date', 'time', 'imagePath',
          'addressId', 'visitedCount', 'urlPath', 'noOfDays',
          'downloadPath', 'agenda'
        ],
        where: {
          appUserId: currentAffairObj.id
        }
      });
      if (currentAffair) {
        res = {
          code: ServerResponseEnum.SUCCESS,
          message: StringResource.SUCCESS,
          data: currentAffair
        };
      } else {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.NO_CURRENT_AFFAIR_FOUND,
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

  public async create(obj: CreateAppUserDto): Promise<IServerResponse> {
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

  public async update(obj: CreateAppUserDto): Promise<IServerResponse> {
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

  public async updateStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.appUserRepository.update(
        {
          appUserStatusId: obj.active ? 1 : 0
        },
        {
          where: {
            appUserId: obj.id
          }
        }
      );
      if (queryRes) {
        res = {
          code: ServerResponseEnum.SUCCESS,
          message: StringResource.SUCCESS,
          data: event
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
}
