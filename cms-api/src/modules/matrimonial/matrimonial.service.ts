import {Injectable} from '@nestjs/common';
import {Sequelize} from "sequelize-typescript";

@Injectable()
export class MatrimonialService {
  constructor(private sequelize: Sequelize) {
  }

  /*public async findAll(searchDto: MatrimonialSearchDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {

      let whereCondition = {};
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.adminUserRepository.count({
        where: whereCondition
      });

      const list = await this.adminUserRepository.findAll<MstAdminUser>({
        include: [
          {
            model: MstAdminRole,
            required: true,
            attributes: ['role']
          }
        ],
        attributes: ['adminId', 'roleId', 'firstName', 'lastName', 'imagePath',
          'emailId', 'contactNo', 'startDate', 'endDate',
          'adminUserStatusId', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'
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
          message: StringResource.NO_EVENT_FOUND,
          data: null
        };
        return res;
      }

      /!*const resList: AdminUserListInterface[] = [];
      for (const s of list) {
        const iEvent: AdminUserListInterface = {
          adminId: s.adminId,
          firstName: s.firstName,
          lastName: s.lastName,
          imagePath: s.imagePath,
          emailId: s.emailId,
          contactNumber: s.contactNo,
          statusId: s.adminUserStatusId,
          startDate: s.startDate ? moment(s.startDate).format(DEFAULT_DATE_FORMAT) : '',
          endDate: s.endDate ? moment(s.endDate).format(DEFAULT_DATE_FORMAT) : '',
          roleId: s.roleId,
          role: s['AdminUserRole']['role'] ? s['AdminUserRole']['role'] : '',
          createdAt: moment(s.createdAt).format(DEFAULT_DATE_TIME_FORMAT),
          updatedAt: moment(s.updatedAt).format(DEFAULT_DATE_TIME_FORMAT)
        };
        resList.push(iEvent);
      }*!/

      res = {
        code: ServerResponseEnum.SUCCESS,
        message: StringResource.SUCCESS,
        data: {
          list: null,
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
      const currentAffair = await this.adminUserRepository.findOne<MstAdminUser>({
        attributes: [
          'eventId', 'title', 'date', 'time', 'imagePath',
          'addressId', 'visitedCount', 'urlPath', 'noOfDays',
          'downloadPath', 'agenda'
        ],
        where: {
          adminId: currentAffairObj.id
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

  public async create(obj: CreateMatrimonialDto, cIp: string): Promise<IServerResponse> {
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

  public async update(obj: CreateMatrimonialDto, cIp: string): Promise<IServerResponse> {
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

  public async updateStatus(obj: AdminUserUpdateStatusDto, cIp: string): Promise<IServerResponse> {
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
  }*/
}
