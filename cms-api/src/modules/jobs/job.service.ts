import {Inject, Injectable} from '@nestjs/common';
import {
  ADMIN_USER_SHORT_INFO_ATTRIBUTE,
  DEFAULT_DATE_TIME_FORMAT,
  IS_DEV,
  JOB_REPOSITORY
} from "../../constants/config-constants";
import {TxnJob} from "../../core/database/models/txn-job.model";
import {IServerResponse} from "../../common-dto/response-interface";
import {CreateJobDto, JobSearchDto} from "./dto/job.dto";
import {ServerResponseEnum} from "../../enums/server-response-enum";
import {StringResource} from "../../enums/string-resource";
import * as moment from 'moment';
import {JobInterfaceList} from "../../response-interface/job.interface";
import {GetDetailDto, UpdateActiveDto} from "../../common-dto/basic-input.dto";
import {MstAdminUser} from "../../core/database/models/mst-admin-user.model";
import {CommonFunctionsUtil} from "../../util/common-functions-util";

@Injectable()
export class JobService {
  constructor(@Inject(JOB_REPOSITORY) private readonly jobRepository: typeof TxnJob) {

  }

  public async findAllJob(searchDto: JobSearchDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {

      let whereCondition = {};
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.jobRepository.count({
        where: whereCondition
      });

      const list = await this.jobRepository.findAll<TxnJob>({
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
        attributes: ['jobId', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['createdAt', 'DESC']
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

      const resList: JobInterfaceList[] = [];
      for (const s of list) {
        const iEvent: JobInterfaceList = {
          id: s.jobId,
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

  public async fetchJobDetailById(currentAffairObj: GetDetailDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const currentAffair = await this.jobRepository.findOne<TxnJob>({
        attributes: [],
        where: {
          jobId: currentAffairObj.id
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

  public async createJob(obj: CreateJobDto): Promise<IServerResponse> {
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

  public async updateJob(obj: CreateJobDto): Promise<IServerResponse> {
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

  public async updateJobStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.jobRepository.update(
        {
          active: obj.active
        },
        {
          where: {
            jobId: obj.id
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
