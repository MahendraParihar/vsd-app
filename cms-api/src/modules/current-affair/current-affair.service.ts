import {Inject, Injectable} from '@nestjs/common';
import {
  ADMIN_USER_SHORT_INFO_ATTRIBUTE,
  CURRENT_AFFAIR_REPOSITORY,
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_TIME_FORMAT, DEFAULT_TIME_FORMAT, DISPLAY_TIME_FORMAT,
  IS_DEV
} from '../../constants/config-constants';
import {TxnCurrentAffair} from '../../core/database/models/txn-current-affair.model';
import {IServerResponse} from '../../common-dto/response-interface';
import {ServerResponseEnum} from '../../enums/server-response-enum';
import {StringResource} from '../../enums/string-resource';
import * as moment from 'moment';
import {CreateCurrentAffairDto, CurrentAffairSearchDto} from './dto/current-affair.dto';
import {CurrentAffairListInterface} from '../../response-interface/current-affair-list.interface';
import {GetDetailDto, UpdateActiveDto} from '../../common-dto/basic-input.dto';
import {MstAdminUser} from "../../core/database/models/mst-admin-user.model";
import {Sequelize} from "sequelize-typescript";
import {CommonFunctionsUtil} from "../../util/common-functions-util";

@Injectable()
export class CurrentAffairService {
  constructor(@Inject(CURRENT_AFFAIR_REPOSITORY) private readonly currentAffairRepository: typeof TxnCurrentAffair,
              private sequelize: Sequelize) {

  }

  public async findAllCurrentAffair(searchDto: CurrentAffairSearchDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      let whereCondition = {};

      const totalCount = await this.currentAffairRepository.count({
        where: whereCondition
      });

      const list = await this.currentAffairRepository.findAll<TxnCurrentAffair>({
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
        attributes: ['currentAffairId', 'title', 'date', 'time', 'imagePath', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['date', 'ASC'],
          ['time', 'ASC'],
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

      const resList: CurrentAffairListInterface[] = [];
      for (const s of list) {
        const iEvent: CurrentAffairListInterface = {
          currentAffairId: s.currentAffairId,
          title: s.title,
          imagePath: s.imagePath,
          date: moment(s.date).format(DEFAULT_DATE_FORMAT),
          time: moment(s.time, DEFAULT_TIME_FORMAT).format(DISPLAY_TIME_FORMAT),
          visitedCount: s.visitedCount,
          active: s.active,
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
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async fetchCurrentAffairDetailById(currentAffairObj: GetDetailDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const currentAffair = await this.currentAffairRepository.findOne<TxnCurrentAffair>({
        attributes: [
          'currentAffairId', 'title', 'description','date', 'time', 'imagePath',
          'isApproved', 'active', 'approvedBy', 'commentsAllow',
          'visitedCount', 'source','active'
        ],
        where: {
          currentAffairId: currentAffairObj.id
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

  public async createCurrentAffair(obj: CreateCurrentAffairDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;

    const t = await this.sequelize.transaction();

    try {
      const insertedData = await this.createData({
        title: obj.title,
        description: obj.description,
        date: obj.date,
        time: obj.time,
        visitedCount: 0,
        source: obj.source,
        commentsAllow: obj.commentsAllow,
        imagePath: (obj.uploadFiles && obj.uploadFiles.length > 0) ? obj.uploadFiles : null,
        createdIp: ip,
        modifiedIp: ip,
        createdBy: adminId,
        modifiedBy: adminId,
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

  public async updateCurrentAffair(id: number, obj: CreateCurrentAffairDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    const t = await this.sequelize.transaction();
    try {

      await this.updateData(id, {
        title: obj.title,
        description: obj.description,
        date: obj.date,
        time: obj.time,
        visitedCount: 0,
        source: obj.source,
        commentsAllow: obj.commentsAllow,
        imagePath: (obj.uploadFiles && obj.uploadFiles.length > 0) ? obj.uploadFiles : null,
        modifiedIp: ip,
        modifiedBy: adminId
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

  public async updateCurrentAffairStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.currentAffairRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId,
          modifiedIp: ip
        },
        {
          where: {
            currentAffairId: obj.id
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

  public async updateCurrentAffairApprovalStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.currentAffairRepository.update(
        {
          isApproved: obj.active,
          approvedBy: obj.active ? adminId : null,
          modifiedBy: adminId,
          modifiedIp: ip
        },
        {
          where: {
            currentAffairId: obj.id
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

  public async updateCurrentAffairCommentAllowStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.currentAffairRepository.update(
        {
          commentsAllow: obj.active,
          modifiedBy: adminId,
          modifiedIp: ip
        },
        {
          where: {
            currentAffairId: obj.id
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
    return await this.currentAffairRepository.create(obj);
  }

  private async updateData(id: number, obj: any) {
    return await this.currentAffairRepository.update(obj, {where: {currentAffairId: id}});
  }
}

