import {Inject, Injectable} from '@nestjs/common';
import {CommonService} from '../common/common.service';
import {IServerResponse} from '../../common-dto/response-interface';
import {ServerResponseEnum} from '../../enums/server-response-enum';
import {StringResource} from '../../enums/string-resource';
import {
  ADMIN_USER_SHORT_INFO_ATTRIBUTE,
  DEFAULT_DATE_TIME_FORMAT,
  FAQ_REPOSITORY,
  INQUIRY_REPOSITORY,
  IS_DEV,
  LEGAL_PAGE_REPOSITORY
} from '../../constants/config-constants';
import {TxnLegalPages} from '../../core/database/models/txn-legal-pages.model';
import {TxnFaq} from '../../core/database/models/txn-faq.model';
import {TxnInquiry} from '../../core/database/models/txn-inquiry.model';
import {MstAdminUser} from "../../core/database/models/mst-admin-user.model";
import {FaqInterfaceList} from "../../response-interface/faq.interface";
import * as moment from 'moment';
import {CreateFaqDto, FaqSearchDto} from "./dto/faq.dto";
import {GetDetailDto, UpdateActiveDto} from "../../common-dto/basic-input.dto";
import {CreateLegalPageDto, LegalPageSearchDto} from "./dto/legal-page.dto";
import {LegalPageListInterface} from "../../response-interface/legal-page.interface";
import {CreateInquiryDto, InquirySearchDto} from "./dto/inquiry.dto";
import {InquiryListInterface} from "../../response-interface/inquiry.interface";
import {CommonFunctionsUtil} from "../../util/common-functions-util";

@Injectable()
export class MiscService {
  constructor(@Inject(FAQ_REPOSITORY) private readonly faqRepository: typeof TxnFaq,
              @Inject(LEGAL_PAGE_REPOSITORY) private readonly legalPageRepository: typeof TxnLegalPages,
              @Inject(INQUIRY_REPOSITORY) private readonly inquiryRepository: typeof TxnInquiry,
              private commonService: CommonService) {
  }

  // region faq
  public async findAllFAQ(searchDto: FaqSearchDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {

      let whereCondition = {};
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.faqRepository.count({
        where: whereCondition
      });

      const list = await this.faqRepository.findAll<TxnFaq>({
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
        attributes: ['faqId', 'faq', 'faqAnswer', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: {
          active: true
        },
        offset: offset,
        limit: pageSize
      });

      if (!list || list.length === 0) {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.NO_FAQ_FOUND,
          data: null
        };
        return res;
      }

      const resList: FaqInterfaceList[] = [];

      for (const s of list) {
        const iObj: FaqInterfaceList = {
          id: s.faqId,
          faq: s.faq,
          answer: s.faqAnswer,
          active: s.active,
          createdBy: CommonFunctionsUtil.getAdminShortInfo(s['CreatedBy'],'CreatedBy'),
          updatedBy: CommonFunctionsUtil.getAdminShortInfo(s['ModifiedBy'],'ModifiedBy'),
          createdAt: moment(s.createdAt).format(DEFAULT_DATE_TIME_FORMAT),
          updatedAt: moment(s.updatedAt).format(DEFAULT_DATE_TIME_FORMAT)
        };
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

  public async fetchFAQDetailById(lovObj: GetDetailDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.faqRepository.findOne<TxnFaq>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          faqId: lovObj.id
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

  public async createFAQ(obj: CreateFaqDto): Promise<IServerResponse> {
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

  public async updateFAQ(obj: CreateFaqDto): Promise<IServerResponse> {
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

  public async updateFAQStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.faqRepository.update(
        {
          active: obj.active
        },
        {
          where: {
            faqId: obj.id
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

  // region legal page
  public async findLegalPage(searchDto: LegalPageSearchDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {

      let whereCondition = {};
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.legalPageRepository.count({
        where: whereCondition
      });

      const list = await this.legalPageRepository.findAll<TxnLegalPages>({
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
        attributes: ['legalPageId', 'legalPage', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: {
          active: true
        },
        offset: offset,
        limit: pageSize
      });

      if (!list || list.length === 0) {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.NO_FAQ_FOUND,
          data: null
        };
        return res;
      }

      const resList: LegalPageListInterface[] = [];

      for (const s of list) {
        const iObj: LegalPageListInterface = {
          id: s.legalPageId,
          name: s.legalPage,
          active: s.active,
          createdBy: CommonFunctionsUtil.getAdminShortInfo(s['CreatedBy'],'CreatedBy'),
          updatedBy: CommonFunctionsUtil.getAdminShortInfo(s['ModifiedBy'],'ModifiedBy'),
          createdAt: moment(s.createdAt).format(DEFAULT_DATE_TIME_FORMAT),
          updatedAt: moment(s.updatedAt).format(DEFAULT_DATE_TIME_FORMAT)
        };
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

  public async fetchLegalPageDetailById(lovObj: GetDetailDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.legalPageRepository.findOne<TxnLegalPages>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          legalPageId: lovObj.id
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

  public async createLegalPage(obj: CreateLegalPageDto): Promise<IServerResponse> {
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

  public async updateLegalPage(obj: CreateLegalPageDto): Promise<IServerResponse> {
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

  public async updateLegalPageStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.legalPageRepository.update(
        {
          active: obj.active
        },
        {
          where: {
            legalPageId: obj.id
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

  // region inquiry
  public async findAllInquiry(searchDto: InquirySearchDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {

      let whereCondition = {};
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.inquiryRepository.count({
        where: whereCondition
      });

      const list = await this.inquiryRepository.findAll<TxnInquiry>({
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
        attributes: ['inquiryId', 'name', 'emailId', 'message', 'responseText', 'isResponded', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: {
          active: true
        },
        offset: offset,
        limit: pageSize
      });

      if (!list || list.length === 0) {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.NO_FAQ_FOUND,
          data: null
        };
        return res;
      }

      const resList: InquiryListInterface[] = [];

      for (const s of list) {
        const iObj: InquiryListInterface = {
          id: s.inquiryId,
          name: s.name,
          emailId: s.emailId,
          message: s.message,
          responseText: s.responseText,
          isResponded: s.isResponded,
          active: s.active,
          createdBy: CommonFunctionsUtil.getAdminShortInfo(s['CreatedBy'],'CreatedBy'),
          updatedBy: CommonFunctionsUtil.getAdminShortInfo(s['ModifiedBy'],'ModifiedBy'),
          createdAt: moment(s.createdAt).format(DEFAULT_DATE_TIME_FORMAT),
          updatedAt: moment(s.updatedAt).format(DEFAULT_DATE_TIME_FORMAT)
        };
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

  public async fetchInquiryDetailById(lovObj: GetDetailDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.inquiryRepository.findOne<TxnInquiry>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          inquiryId: lovObj.id
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

  public async createInquiry(obj: CreateInquiryDto): Promise<IServerResponse> {
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

  public async updateInquiry(obj: CreateInquiryDto): Promise<IServerResponse> {
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

  public async updateInquiryStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.inquiryRepository.update(
        {
          active: obj.active
        },
        {
          where: {
            inquiryId: obj.id
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
}
