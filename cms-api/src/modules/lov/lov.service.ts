import {Inject, Injectable} from '@nestjs/common';
import {
  ADDICTION_REPOSITORY, ADMIN_USER_SHORT_INFO_ATTRIBUTE,
  BUSINESS_REPOSITORY,
  CITY_VILLAGE_REPOSITORY,
  COUNTRY_REPOSITORY,
  DEFAULT_DATE_TIME_FORMAT,
  DISTRICT_REPOSITORY,
  FAQ_CATEGORY_REPOSITORY,
  GENDER_REPOSITORY,
  GOTRA_REPOSITORY,
  IS_DEV,
  JOB_CATEGORY_REPOSITORY,
  JOB_SUB_CATEGORY_REPOSITORY,
  JOB_TYPE_REPOSITORY,
  POST_REPOSITORY,
  RELATION_REPOSITORY,
  RELIGION_REPOSITORY,
  SERVICE_REPOSITORY,
  STATE_REPOSITORY
} from '../../constants/config-constants';
import {IServerResponse} from '../../common-dto/response-interface';
import {ServerResponseEnum} from '../../enums/server-response-enum';
import {StringResource} from '../../enums/string-resource';
import * as moment from 'moment';
import {Sequelize} from "sequelize-typescript";
import {LovBasicDto, LovSearchDtp} from "./dto/lov.dto";
import {MstAddiction} from "../../core/database/models/mst-addiction.model";
import {MstAdminUser} from "../../core/database/models/mst-admin-user.model";
import {MstBusiness} from "../../core/database/models/mst-business.model";
import {MstCityVillage} from "../../core/database/models/mst-city-village.model";
import {MstDistrict} from "../../core/database/models/mst-district.model";
import {MstCountry} from "../../core/database/models/mst-country.model";
import {MstState} from "../../core/database/models/mst-state.model";
import {MstFaqCategory} from "../../core/database/models/mst-faq-category.model";
import {MstJobCategory} from "../../core/database/models/mst-job-category.model";
import {MstJobType} from "../../core/database/models/mst-job-type.model";
import {MstJobSubCategory} from "../../core/database/models/mst-job-sub-category.model";
import {MstGender} from "../../core/database/models/mst-gender.model";
import {MstGotra} from "../../core/database/models/mst-gotra.model";
import {MstReligion} from "../../core/database/models/mst-religion.model";
import {MstRelation} from "../../core/database/models/mst-relation.model";
import {MstPost} from "../../core/database/models/mst-post.model";
import {MstService} from "../../core/database/models/mst-service.model";
import {AdditionInterface} from "../../response-interface/lov/addition.interface";
import {BusinessInterface} from "../../response-interface/lov/business.interface";
import {ServiceInterface} from "../../response-interface/lov/service.interface";
import {CountryInterface} from "../../response-interface/lov/country.interface";
import {StateInterface} from "../../response-interface/lov/state.interface";
import {DistrictInterface} from "../../response-interface/lov/district.interface";
import {CityVillageInterface} from "../../response-interface/lov/city-village.interface";
import {GenderInterface} from "../../response-interface/lov/gender.interface";
import {GotraInterface} from "../../response-interface/lov/gotra.interface";
import {FaqCategoryInterface} from "../../response-interface/lov/faq-category.interface";
import {JobSubCategoryInterface} from "../../response-interface/lov/job-sub-category.interface";
import {JobCategoryInterface} from "../../response-interface/lov/job-category.interface";
import {JobTypeInterface} from "../../response-interface/lov/job-type.interface";
import {PostInterface} from "../../response-interface/lov/post.interface";
import {ReligionInterface} from "../../response-interface/lov/religion.interface";
import {RelationShipInterface} from "../../response-interface/lov/relation-ship.interface";
import {UpdateActiveDto} from "../../common-dto/basic-input.dto";
import {CommonFunctionsUtil} from "../../util/common-functions-util";

@Injectable()
export class LovService {
  constructor(@Inject(ADDICTION_REPOSITORY) private readonly addictionRepository: typeof MstAddiction,
              @Inject(BUSINESS_REPOSITORY) private readonly businessRepository: typeof MstBusiness,
              @Inject(CITY_VILLAGE_REPOSITORY) private readonly cityVillageRepository: typeof MstCityVillage,
              @Inject(DISTRICT_REPOSITORY) private readonly districtRepository: typeof MstDistrict,
              @Inject(COUNTRY_REPOSITORY) private readonly countryRepository: typeof MstCountry,
              @Inject(STATE_REPOSITORY) private readonly stateRepository: typeof MstState,
              @Inject(FAQ_CATEGORY_REPOSITORY) private readonly faqCategoryRepository: typeof MstFaqCategory,
              @Inject(JOB_CATEGORY_REPOSITORY) private readonly jobCategoryRepository: typeof MstJobCategory,
              @Inject(JOB_TYPE_REPOSITORY) private readonly jobTypeRepository: typeof MstJobType,
              @Inject(JOB_SUB_CATEGORY_REPOSITORY) private readonly jobSubCategoryRepository: typeof MstJobSubCategory,
              @Inject(GENDER_REPOSITORY) private readonly genderRepository: typeof MstGender,
              @Inject(GOTRA_REPOSITORY) private readonly gotraRepository: typeof MstGotra,
              @Inject(RELIGION_REPOSITORY) private readonly religionRepository: typeof MstReligion,
              @Inject(RELATION_REPOSITORY) private readonly relationRepository: typeof MstRelation,
              @Inject(POST_REPOSITORY) private readonly postRepository: typeof MstPost,
              @Inject(SERVICE_REPOSITORY) private readonly serviceRepository: typeof MstService,
              private sequelize: Sequelize) {

  }

  // region Addiction
  public async findAllAddiction(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['addiction'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.addictionRepository.count({
        where: whereCondition
      });


      const list = await this.addictionRepository.findAll<MstAddiction>({
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
        attributes: [
          'addictionId', 'addiction', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['addiction', 'ASC']
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

      const resList: AdditionInterface[] = [];
      for (const s of list) {
        const iEvent: AdditionInterface = {
          id: s.addictionId,
          name: s.addiction,
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
      if (IS_DEV) {
        console.log(e);
      }
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async fetchAddictionDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.addictionRepository.findOne<MstAddiction>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          addictionId: lovObj.id
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

  public async createAddiction(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateAddiction(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateAddictionStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.addictionRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            addictionId: obj.id
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

  // endregion

  // region Business
  public async findAllBusiness(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['business'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.businessRepository.count({
        where: whereCondition
      });


      const list = await this.businessRepository.findAll<MstBusiness>({
        include: [
          {
            model: MstAdminUser,
            as: 'CreatedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            as: 'ModifiedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          }
        ],
        attributes: ['businessId', 'business', 'imagePath', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['business', 'ASC']
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

      const resList: BusinessInterface[] = [];
      for (const s of list) {
        const iEvent: BusinessInterface = {
          id: s.businessId,
          name: s.business,
          imagePath: s.imagePath,
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

  public async fetchBusinessDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.businessRepository.findOne<MstBusiness>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          businessId: lovObj.id
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

  public async createBusiness(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateBusiness(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateBusinessStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.businessRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            businessId: obj.id
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

  // endregion

  // region Service
  public async findAllService(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['service'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.serviceRepository.count({
        where: whereCondition
      });

      const list = await this.serviceRepository.findAll<MstService>({
        include: [
          {
            model: MstAdminUser,
            as: 'CreatedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            as: 'ModifiedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          }
        ],
        attributes: ['serviceId', 'service', 'imagePath', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['service', 'ASC']
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

      const resList: ServiceInterface[] = [];
      for (const s of list) {
        const iEvent: ServiceInterface = {
          id: s.serviceId,
          name: s.service,
          imagePath: s.imagePath,
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

  public async fetchServiceDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.serviceRepository.findOne<MstService>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          serviceId: lovObj.id
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

  public async createService(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateService(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateServiceStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.serviceRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            serviceId: obj.id
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

  // endregion

  // region Country
  public async findAllCountry(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['country'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.countryRepository.count({
        where: whereCondition
      });

      const list = await this.countryRepository.findAll<MstCountry>({
        include: [
          {
            model: MstAdminUser,
            as: 'CreatedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            as: 'ModifiedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          }
        ],
        attributes: ['countryId', 'country', 'countryCode', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['country', 'ASC']
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

      const resList: CountryInterface[] = [];
      for (const s of list) {
        const iEvent: CountryInterface = {
          id: s.countryId,
          name: s.country,
          countryCode: s.countryCode,
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

  public async fetchCountryDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.countryRepository.findOne<MstCountry>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          countryId: lovObj.id
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

  public async createCountry(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateCountry(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateCountryStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.countryRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            countryId: obj.id
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

  // endregion

  // region State
  public async findAllState(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['state'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.stateRepository.count({
        where: whereCondition
      });

      const list = await this.stateRepository.findAll<MstState>({
        include: [
          {
            model: MstAdminUser,
            as: 'CreatedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            as: 'ModifiedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          }
        ],
        attributes: ['stateId', 'state', 'stateCode', 'countryId', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['countryId', 'ASC'],
          ['state', 'ASC']
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

      const resList: StateInterface[] = [];
      for (const s of list) {
        const iEvent: StateInterface = {
          id: s.stateId,
          name: s.state,
          stateCode: s.stateCode,
          countryId: s.countryId,
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

  public async fetchStateDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.stateRepository.findOne<MstState>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          stateId: lovObj.id
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

  public async createState(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateState(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateStateStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.stateRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            stateId: obj.id
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

  // endregion

  // region District
  public async findAllDistrict(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['district'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.districtRepository.count({
        where: whereCondition
      });

      const list = await this.districtRepository.findAll<MstDistrict>({
        include: [
          {
            model: MstAdminUser,
            as: 'CreatedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            as: 'ModifiedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
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
        ],
        attributes: ['districtId', 'district', 'stateId', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['stateId', 'ASC'],
          ['district', 'ASC']
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

      const resList: DistrictInterface[] = [];
      for (const s of list) {
        const iEvent: DistrictInterface = {
          id: s.districtId,
          name: s.district,
          state: s['DistrictState']['state'],
          country: s['DistrictState']['StateCountry']['country'],
          stateId: s.stateId,
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

  public async fetchDistrictDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.districtRepository.findOne<MstDistrict>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          districtId: lovObj.id
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

  public async createDistrict(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateDistrict(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateDistrictStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.districtRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            districtId: obj.id
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

  // endregion

  // region City Village
  public async findAllCityVillage(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['cityVillage'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.cityVillageRepository.count({
        where: whereCondition
      });

      const list = await this.cityVillageRepository.findAll<MstCityVillage>({
        include: [
          {
            model: MstAdminUser,
            as: 'CreatedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            as: 'ModifiedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
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
        ],
        attributes: ['cityVillageId', 'cityVillage', 'districtId', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['districtId', 'ASC'],
          ['cityVillage', 'ASC']
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

      const resList: CityVillageInterface[] = [];
      for (const s of list) {
        const iEvent: CityVillageInterface = {
          id: s.cityVillageId,
          name: s.cityVillage,
          districtId: s.districtId,
          district: s['CityVillageDistrict']['district'],
          state: s['CityVillageDistrict']['DistrictState']['state'],
          country: s['CityVillageDistrict']['DistrictState']['StateCountry']['country'],
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

  public async fetchCityVillageDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.cityVillageRepository.findOne<MstCityVillage>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          cityVillageId: lovObj.id
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

  public async createCityVillage(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateCityVillage(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateCityVillageStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.cityVillageRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            cityVillageId: obj.id
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

  // endregion

  // region Gender
  public async findAllGender(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['gender'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.genderRepository.count({
        where: whereCondition
      });

      const list = await this.genderRepository.findAll<MstGender>({
        include: [
          {
            model: MstAdminUser,
            as: 'CreatedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            as: 'ModifiedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          }
        ],
        attributes: ['genderId', 'gender', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['gender', 'ASC']
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

      const resList: GenderInterface[] = [];
      for (const s of list) {
        const iEvent: GenderInterface = {
          id: s.genderId,
          name: s.gender,
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

  public async fetchGenderDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.genderRepository.findOne<MstGender>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          genderId: lovObj.id
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

  public async createGender(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateGender(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateGenderStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.genderRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            genderId: obj.id
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

  // endregion

  // region Gotra
  public async findAllGotra(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['gotra'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.gotraRepository.count({
        where: whereCondition
      });

      const list = await this.gotraRepository.findAll<MstGotra>({
        include: [
          {
            model: MstAdminUser,
            as: 'CreatedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            as: 'ModifiedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          }
        ],
        attributes: ['gotraId', 'gotra', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['gotra', 'ASC']
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

      const resList: GotraInterface[] = [];
      for (const s of list) {
        const iEvent: GotraInterface = {
          id: s.gotraId,
          name: s.gotra,
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

  public async fetchGotraDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.gotraRepository.findOne<MstGotra>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          gotraId: lovObj.id
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

  public async createGotra(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateGotra(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateGotraStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.gotraRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            gotraId: obj.id
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

  // endregion

  // region Relation-Ship
  public async findAllRelationShip(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['relation'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.relationRepository.count({
        where: whereCondition
      });

      const list = await this.relationRepository.findAll<MstRelation>({
        include: [
          {
            model: MstAdminUser,
            as: 'CreatedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            as: 'ModifiedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          }
        ],
        attributes: ['relationId', 'relation', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['relation', 'ASC']
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

      const resList: RelationShipInterface[] = [];
      for (const s of list) {
        const iEvent: RelationShipInterface = {
          id: s.relationId,
          name: s.relation,
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

  public async fetchRelationShipDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.relationRepository.findOne<MstRelation>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          relationId: lovObj.id
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

  public async createRelationShip(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateRelationShip(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateRelationShipStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.relationRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            relationId: obj.id
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

  // endregion

  // region Religion
  public async findAllReligion(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['religion'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.religionRepository.count({
        where: whereCondition
      });

      const list = await this.religionRepository.findAll<MstReligion>({
        include: [
          {
            model: MstAdminUser,
            as: 'CreatedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            as: 'ModifiedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          }
        ],
        attributes: ['religionId', 'religion', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['religion', 'ASC']
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

      const resList: ReligionInterface[] = [];
      for (const s of list) {
        const iEvent: ReligionInterface = {
          id: s.religionId,
          name: s.religion,
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

  public async fetchReligionDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.religionRepository.findOne<MstReligion>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          religionId: lovObj.id
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

  public async createReligion(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateReligion(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateReligionStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.religionRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            religionId: obj.id
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

  // endregion

  // region Post
  public async findAllPost(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['name'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.postRepository.count({
        where: whereCondition
      });

      const list = await this.postRepository.findAll<MstPost>({
        include: [
          {
            model: MstAdminUser,
            as: 'CreatedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            as: 'ModifiedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          }
        ],
        attributes: ['postId', 'post', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['post', 'ASC']
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

      const resList: PostInterface[] = [];
      for (const s of list) {
        const iEvent: PostInterface = {
          id: s.postId,
          name: s.post,
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

  public async fetchPostDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.postRepository.findOne<MstPost>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          postId: lovObj.id
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

  public async createPost(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updatePost(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updatePostStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.postRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            postId: obj.id
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

  // endregion

  // region Job Type
  public async findAllJobType(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['jobType'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.jobTypeRepository.count({
        where: whereCondition
      });

      const list = await this.jobTypeRepository.findAll<MstJobType>({
        include: [
          {
            model: MstAdminUser,
            as: 'CreatedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            as: 'ModifiedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          }
        ],
        attributes: ['jobTypeId', 'jobType', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['jobType', 'ASC']
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

      const resList: JobTypeInterface[] = [];
      for (const s of list) {
        const iEvent: JobTypeInterface = {
          id: s.jobTypeId,
          name: s.jobType,
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

  public async fetchJobTypeDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.jobTypeRepository.findOne<MstJobType>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          jobTypeId: lovObj.id
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

  public async createJobType(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateJobType(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateJobTypeStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.jobTypeRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            jobTypeId: obj.id
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

  // endregion

  // region Job Category
  public async findAllJobCategory(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['jobCategory'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.jobCategoryRepository.count({
        where: whereCondition
      });

      const list = await this.jobCategoryRepository.findAll<MstJobCategory>({
        include: [
          {
            model: MstAdminUser,
            as: 'CreatedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            as: 'ModifiedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          }
        ],
        attributes: ['jobCategoryId', 'jobCategory', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['jobCategory', 'ASC']
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

      const resList: JobCategoryInterface[] = [];
      for (const s of list) {
        const iEvent: JobCategoryInterface = {
          id: s.jobCategoryId,
          name: s.jobCategory,
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

  public async fetchJobCategoryDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.jobCategoryRepository.findOne<MstJobCategory>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          jobCategoryId: lovObj.id
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

  public async createJobCategory(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateJobCategory(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateJobCategoryStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.jobCategoryRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            jobCategoryId: obj.id
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

  // endregion

  // region Job Sub-Category
  public async findAllJobSubCategory(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['jobSubCategory'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.jobSubCategoryRepository.count({
        where: whereCondition
      });

      const list = await this.jobSubCategoryRepository.findAll<MstJobSubCategory>({
        include: [
          {
            model: MstAdminUser,
            as: 'CreatedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            as: 'ModifiedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          }
        ],
        attributes: ['jobSubCategoryId', 'jobCategoryId', 'jobSubCategory', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['jobCategoryId', 'ASC'],
          ['jobSubCategory', 'ASC']
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

      const resList: JobSubCategoryInterface[] = [];
      for (const s of list) {
        const iEvent: JobSubCategoryInterface = {
          id: s.jobSubCategoryId,
          jobCategoryId: s.jobCategoryId,
          name: s.jobSubCategory,
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

  public async fetchJobSubCategoryDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.jobSubCategoryRepository.findOne<MstJobSubCategory>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          jobSubCategoryId: lovObj.id
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

  public async createJobSubCategory(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateJobSubCategory(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateJobSubCategoryStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.jobSubCategoryRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            jobSubCategoryId: obj.id
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

  // endregion

  // region Faq-Category
  public async findAllFaqCategory(searchDto: LovSearchDtp): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      let whereCondition = {};
      if (searchDto.name) {
        whereCondition['faqCategory'] = searchDto.name;
      }
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const totalCount = await this.faqCategoryRepository.count({
        where: whereCondition
      });

      const list = await this.faqCategoryRepository.findAll<MstFaqCategory>({
        include: [
          {
            model: MstAdminUser,
            as: 'CreatedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            as: 'ModifiedBy',
            required: false,
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          }
        ],
        attributes: ['faqCategoryId', 'faqCategory', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['faqCategory', 'ASC']
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

      const resList: FaqCategoryInterface[] = [];
      for (const s of list) {
        const iEvent: FaqCategoryInterface = {
          id: s.faqCategoryId,
          name: s.faqCategory,
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

  public async fetchFaqCategoryDetailById(lovObj: LovBasicDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const detailObj = await this.faqCategoryRepository.findOne<MstFaqCategory>({
        attributes: {exclude: ['createdAt', 'updatedAt', 'createdBy', 'modifiedBy']},
        where: {
          faqCategoryId: lovObj.id
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

  public async createFaqCategory(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateFaqCategory(obj: LovBasicDto, cIp: string): Promise<IServerResponse> {
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

  public async updateFaqCategoryStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.faqCategoryRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId
        },
        {
          where: {
            faqCategoryId: obj.id
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

  // endregion
}
