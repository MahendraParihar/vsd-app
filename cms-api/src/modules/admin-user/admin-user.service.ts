import {Inject, Injectable} from '@nestjs/common';
import {
  ADMIN_IMAGE_PATH,
  ADMIN_ROLE_REPOSITORY,
  ADMIN_USER_REPOSITORY, ADMIN_USER_SHORT_INFO_ATTRIBUTE, DB_DATE_FORMAT, DB_DATE_TIME_FORMAT,
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_TIME_FORMAT,
  IS_DEV
} from '../../constants/config-constants';
import {IServerResponse} from '../../common-dto/response-interface';
import {ServerResponseEnum} from '../../enums/server-response-enum';
import {StringResource} from '../../enums/string-resource';
import * as moment from 'moment';
import {MstAdminUser} from "../../core/database/models/mst-admin-user.model";
import {AdminUserDto, AdminUserSearchDto, AdminUserUpdateStatusDto} from "./dto/admin-user.dto";
import {AdminUserListInterface} from "../../response-interface/admin-user-list.interface";
import {Sequelize} from "sequelize-typescript";
import {MstAdminRole} from "../../core/database/models/mst-admin-role.model";
import {CommonService} from "../common/common.service";
import {CommonFunctionsUtil} from "../../util/common-functions-util";
import {MstCityVillage} from "../../core/database/models/mst-city-village.model";
import {AdminUserStatusEnum} from "../../enums/admin-user-status";

@Injectable()
export class AdminUserService {
  constructor(@Inject(ADMIN_USER_REPOSITORY) private readonly adminUserRepository: typeof MstAdminUser,
              @Inject(ADMIN_ROLE_REPOSITORY) private readonly adminRoleRepository: typeof MstAdminRole,
              private sequelize: Sequelize,
              private commonService: CommonService) {

  }

  public async findAll(searchDto: AdminUserSearchDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {

      let whereCondition = {};
      if (searchDto.firstName) {
        whereCondition['firstName'] = searchDto.firstName;
      }
      if (searchDto.lastName) {
        whereCondition['lastName'] = searchDto.lastName;
      }
      if (searchDto.contactNumber) {
        whereCondition['contactNo'] = searchDto.contactNumber;
      }
      if (searchDto.emailId) {
        whereCondition['emailId'] = searchDto.emailId;
      }
      if (searchDto.startDate) {
        whereCondition['startDate'] = searchDto.startDate;
      }
      if (searchDto.endDate) {
        whereCondition['endDate'] = searchDto.endDate;
      }
      if (searchDto.statusId) {
        whereCondition['adminUserStatusId'] = searchDto.statusId;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.adminUserRepository.count({
        where: whereCondition
      });

      MstAdminUser.belongsTo(MstCityVillage, {
        targetKey: 'cityVillageId',
        foreignKey: 'cityVillageId'
      })

      MstAdminUser.belongsTo(MstAdminUser, {
        targetKey: 'adminId',
        foreignKey: 'createdBy'
      })

      MstAdminUser.belongsTo(MstAdminUser, {
        targetKey: 'adminId',
        foreignKey: 'modifiedBy'
      })

      const list = await this.adminUserRepository.findAll<MstAdminUser>({
        attributes: ['adminId', 'firstName', 'lastName', 'imagePath',
          'emailId', 'contactNo', 'startDate', 'endDate','cityVillageId',
          'adminUserStatusId', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'
        ],
        include: [
          {
            model: MstCityVillage,
            required:false
          },
          {
            model: MstAdminUser,
            required:false
          },
          {
            model: MstAdminUser,
            required:false
          },
        ],
        where: whereCondition,
        order: [
          ['firstName', 'ASC'],
          ['lastName', 'ASC'],
        ],
        nest:true,
        raw:true,
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

      const resList: AdminUserListInterface[] = [];
      for (const s of list) {
        const iEvent: AdminUserListInterface = {
          adminId: s.adminId,
          firstName: s.firstName,
          lastName: s.lastName,
          imagePath: s.imagePath,
          emailId: s.emailId,
          contactNo: s.contactNo,
          adminUserStatusId: s.adminUserStatusId,
          cityVillageId: s.cityVillageId,
          cityVillage: s['AdminUserCityVillage'] ? s['AdminUserCityVillage']['cityVillage'] : null,
          startDate: s.startDate ? moment(s.startDate, DB_DATE_FORMAT) : null,
          endDate: s.endDate ? moment(s.endDate, DB_DATE_FORMAT) : null,
          createdAt: moment(s.createdAt).format(DEFAULT_DATE_TIME_FORMAT),
          updatedAt: moment(s.updatedAt).format(DEFAULT_DATE_TIME_FORMAT),
          createdBy: CommonFunctionsUtil.getAdminShortInfo(s['CreatedBy'], 'CreatedBy'),
          updatedBy: CommonFunctionsUtil.getAdminShortInfo(s['ModifiedBy'], 'ModifiedBy'),
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

  public async fetchDetailById(adminId: number): Promise<IServerResponse> {

    let res: IServerResponse;
    try {

      MstAdminUser.belongsTo(MstCityVillage, {
        as:'AdminUserCityVillage',
        targetKey: 'cityVillageId',
        foreignKey: 'cityVillageId'
      })

      MstAdminUser.belongsTo(MstAdminUser, {
        as: 'CreatedBy',
        targetKey: 'adminId',
        foreignKey: 'createdBy'
      })

      MstAdminUser.belongsTo(MstAdminUser, {
        as: 'ModifiedBy',
        targetKey: 'adminId',
        foreignKey: 'modifiedBy'
      })

      const dbObject = await this.adminUserRepository.findOne<MstAdminUser>({
        attributes: [
          'adminId', 'firstName', 'lastName', 'imagePath', 'emailId',
          'contactNo', 'cityVillageId', 'startDate', 'endDate', 'cityVillageId',
          'adminUserStatusId', 'deactiveReason'
        ],
        include: [
          'AdminUserCityVillage',
          'CreatedBy',
          'ModifiedBy'
        ],
        where: {
          adminId: adminId
        },
        logging:console.log
      });
      if (dbObject) {

        const adminObj = {
          adminId: dbObject.adminId,
          firstName: dbObject.firstName,
          lastName: dbObject.lastName,
          imagePath: dbObject.imagePath,
          emailId: dbObject.emailId,
          contactNo: dbObject.contactNo,
          adminUserStatusId: dbObject.adminUserStatusId,
          cityVillageId: dbObject.cityVillageId,
          cityVillage: dbObject['AdminUserCityVillage']['cityVillage'],
          startDate: dbObject.startDate ? moment(dbObject.startDate, DB_DATE_TIME_FORMAT) : null,
          endDate: dbObject.endDate ? moment(dbObject.endDate, DB_DATE_TIME_FORMAT) : null,
          createdAt: moment(dbObject.createdAt).format(DEFAULT_DATE_TIME_FORMAT),
          updatedAt: moment(dbObject.updatedAt).format(DEFAULT_DATE_TIME_FORMAT),
          createdBy: CommonFunctionsUtil.getAdminShortInfo(dbObject['CreatedBy'], 'CreatedBy'),
          updatedBy: CommonFunctionsUtil.getAdminShortInfo(dbObject['ModifiedBy'], 'ModifiedBy'),
        }

        res = {
          code: ServerResponseEnum.SUCCESS,
          message: StringResource.SUCCESS,
          data: adminObj
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

  public async create(obj: AdminUserDto, cIp: string): Promise<IServerResponse> {
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

  public async update(obj: AdminUserDto, cIp: string): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const update = await this.adminUserRepository.update({
          firstName: obj.firstName,
          lastName: obj.lastName,
          // contactNo: obj.contactNo,
          // emailId: obj.emailId,
          cityVillageId: obj.cityVillageId,
          startDate: obj.startDate,
          endDate: obj.endDate,
          adminUserStatusId: obj.statusId,
          deactiveReason: obj.reason,
        },
        {
          where: {
            adminId: obj.adminId
          }
        });

      res = {
        code: ServerResponseEnum.SUCCESS,
        message: StringResource.SUCCESS,
        data: null
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

  public async updateStatus(obj: AdminUserUpdateStatusDto, cIp: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.adminUserRepository.update(
        {
          adminUserStatusId: obj.statusId,
          // modifiedBy: obj.updateBy,
          modifiedIp: cIp
        },
        {
          where: {
            adminId: obj.adminId
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

  public async getAdminMasterData() {
    const adminRoleList = await this.commonService.getAdminRoleList();
    const cityVillageList = await this.commonService.getFamilyCityVillageList();
    const adminStatusList = await this.commonService.getAdminStatsList();
    return {
      code: ServerResponseEnum.SUCCESS,
      message: StringResource.SUCCESS,
      data: {
        cityVillageList: cityVillageList,
        adminRole: adminRoleList,
        adminStatus: adminStatusList,
      }
    }
  }
}
