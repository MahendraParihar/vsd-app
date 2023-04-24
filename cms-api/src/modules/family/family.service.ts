import {Inject, Injectable} from '@nestjs/common';
import {GetDetailDto, UpdateActiveDto} from '../../common-dto/basic-input.dto';
import {IServerResponse} from '../../common-dto/response-interface';
import {
  ADMIN_USER_SHORT_INFO_ATTRIBUTE,
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_TIME_FORMAT,
  FAMILY_ADDICTION_REPOSITORY,
  FAMILY_BUSINESS_MAPPING_REPOSITORY,
  FAMILY_BUSINESS_REPOSITORY,
  FAMILY_CONTACT_NUMBER_REPOSITORY,
  FAMILY_EDUCATION_REPOSITORY,
  FAMILY_PROFILE_REPOSITORY,
  FAMILY_RELATIONSHIP_REPOSITORY,
  FAMILY_REPOSITORY,
  FAMILY_SERVICE_REPOSITORY,
  IS_DEV
} from '../../constants/config-constants';
import {TxnFamily} from '../../core/database/models/txn-family.model';
import {ServerResponseEnum} from '../../enums/server-response-enum';
import {StringResource} from '../../enums/string-resource';
import {
  FamilyProfileInterface,
  IFamilyAddiction, IFamilyBusiness,
  IFamilyContactDetail,
  IFamilyEducation,
  IFamilyList, IFamilyService
} from '../../response-interface/family-list.interface';
import {CreateFamilyDto, FamilyContactNumberDto, FamilySearchDto} from './dto/family.dto';
import {MstAdminUser} from "../../core/database/models/mst-admin-user.model";
import * as moment from 'moment';
import {CommonService} from "../common/common.service";
import {Op} from 'sequelize';
import {MstCityVillage} from "../../core/database/models/mst-city-village.model";
import {Sequelize} from "sequelize-typescript";
import {TxnFamilyEducation} from "../../core/database/models/txn-family-education.model";
import {TxnFamilyProfile} from "../../core/database/models/txn-family-profile.model";
import {ReligionEnum} from "../../enums/religion-enum";
import {CasteEnum} from "../../enums/caste-enum";
import {MstMaritalStatus} from "../../core/database/models/mst-marital-status.model";
import {MstReligion} from "../../core/database/models/mst-religion.model";
import {MstGender} from "../../core/database/models/mst-gender.model";
import {MstCaste} from "../../core/database/models/mst-caste.model";
import {MstGotra} from "../../core/database/models/mst-gotra.model";
import {MstRaasi} from "../../core/database/models/mst-raasi.model";
import {TxnFamilyAddictionMapping} from "../../core/database/models/txn-family-addiction-mapping.model";
import {TxnFamilyBusiness} from "../../core/database/models/txn-family-business.model";
import {TxnFamilyBusinessMapping} from "../../core/database/models/txn-family-business-mapping.model";
import {TxnFamilyService} from "../../core/database/models/txn-family-service.model";
import {TxnFamilyContactNumber} from "../../core/database/models/txn-family-contact-number.model";
import {TxnFamilyRelationshipMapping} from "../../core/database/models/txn-family-relationship-mapping.model";
import {MstAddiction} from "../../core/database/models/mst-addiction.model";
import {CommonFunctionsUtil} from "../../util/common-functions-util";
import {MstEducationDegree} from "../../core/database/models/mst-education-degree.model";
import {MstContactType} from "../../core/database/models/mst-contact-type.model";
import {IAddress} from "../../response-interface/address.interface";
import {TableEnum} from "../../enums/table-enum";
import {MstBusiness} from "../../core/database/models/mst-business.model";
import {IMediaUpload} from "../../response-interface/media-upload.interface";
import {MstService} from "../../core/database/models/mst-service.model";

@Injectable()
export class FamilyService {
  constructor(@Inject(FAMILY_REPOSITORY) private readonly familyRepository: typeof TxnFamily,
              @Inject(FAMILY_PROFILE_REPOSITORY) private readonly familyProfileRepository: typeof TxnFamilyProfile,
              @Inject(FAMILY_EDUCATION_REPOSITORY) private readonly familyEducationRepository: typeof TxnFamilyEducation,
              @Inject(FAMILY_ADDICTION_REPOSITORY) private readonly familyAddictionMappingRepository: typeof TxnFamilyAddictionMapping,
              @Inject(FAMILY_BUSINESS_REPOSITORY) private readonly familyBusinessRepository: typeof TxnFamilyBusiness,
              @Inject(FAMILY_BUSINESS_MAPPING_REPOSITORY) private readonly familyBusinessMappingRepository: typeof TxnFamilyBusinessMapping,
              @Inject(FAMILY_SERVICE_REPOSITORY) private readonly familyServiceRepository: typeof TxnFamilyService,
              @Inject(FAMILY_CONTACT_NUMBER_REPOSITORY) private readonly familyContactNumberRepository: typeof TxnFamilyContactNumber,
              @Inject(FAMILY_RELATIONSHIP_REPOSITORY) private readonly familyRelationshipMappingRepository: typeof TxnFamilyRelationshipMapping,
              private commonService: CommonService,
              private sequelize: Sequelize) {
  }

  public async findAll(searchDto: FamilySearchDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const whereCondition = {};
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      const offset = pageNumber === 0 ? 0 : pageNumber * pageSize;

      const totalCount = await this.familyRepository.count({
        where: whereCondition,
      });

      const list = await this.familyRepository.findAll<TxnFamily>({
        include: [
          {
            model: MstAdminUser,
            required: false,
            as: 'ApprovedBy',
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            required: true,
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
            required: true,
            as: 'AppUserCityVillage',
            attributes: ['cityVillage']
          }
        ],
        attributes: ['familyId', 'firstName', 'middleName', 'lastName', 'imagePath', 'emailId', 'contactNo', 'cityVillageId', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy', 'approvedBy', 'isApproved'],
        where: whereCondition,
        order: [
          ['firstName', 'ASC'],
          ['middleName', 'ASC'],
          ['lastName', 'ASC'],
        ],
        offset: offset,
        limit: pageSize,
        raw:true,
        nest:true
      });

      if (!list || list.length === 0) {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.NO_FAMILY_FOUND,
          data: null
        };
        return res;
      }
      console.log(list);
      const resList: IFamilyList[] = [];
      for (const s of list) {
        const iEvent: IFamilyList = {
          familyId: s.familyId,
          firstName: s.firstName,
          middleName: s.middleName,
          lastName: s.lastName,
          imagePath: CommonFunctionsUtil.getImagesObj(s.imagePath),
          emailId: s.emailId,
          contactNo: s.contactNo,
          cityVillageId: s.cityVillageId,
          cityVillage: s['AppUserCityVillage']['cityVillage'],
          active: s.active,
          isApproved: s.isApproved,
          approvedBy: CommonFunctionsUtil.getAdminShortInfo(s['ApprovedBy'], 'ApprovedBy'),
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

  public async fetchDetailById(basicObj: GetDetailDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const family = await this.fetchFamily(basicObj.id);
      const familyProfile = await this.fetchFamilyProfile(basicObj.id);
      if (family) {
        res = {
          code: ServerResponseEnum.SUCCESS,
          message: StringResource.SUCCESS,
          data: {
            family:family,
            familyProfile:familyProfile,
          }
        };
      } else {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.NO_FAMILY_FOUND,
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

  public async create(obj: CreateFamilyDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;

    const t = await this.sequelize.transaction();

    try {

      let checkUser = await this.findOneByEmailOrContactNumber(obj.emailId, obj.contactNo);
      if (checkUser) {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.ACCOUNT_ALREADY_PRESENT,
          data: null
        };
        return res;
      }

      const insertFamily = await this.createData({
        firstName: obj.firstName,
        lastName: obj.lastName,
        middleName: obj.middleName,
        emailId: obj.emailId,
        contactNo: obj.contactNo,
        cityVillageId: obj.familyCityVillageId,
        imagePath: (obj.uploadFiles && obj.uploadFiles.length > 0) ? obj.uploadFiles : null,
        createdIp: ip,
        modifiedIp: ip,
        createdBy: adminId,
        modifiedBy: adminId,
      });

      await this.createProfileData({
        familyId: insertFamily.familyId,
        dateOfBirth: obj.dateOfBirth ? obj.dateOfBirth : null,
        height: obj.height ? obj.height : null,
        weight: obj.weight ? obj.weight : null,
        genderId: obj.genderId ? obj.genderId : null,
        maritalStatusId: obj.maritalStatusId ? obj.maritalStatusId : null,
        religionId: obj.religionId ? obj.religionId : ReligionEnum.HINDU,
        casteId: obj.casteId ? obj.casteId : CasteEnum.SUTHAR,
        gotraId: obj.gotraId ? obj.gotraId : null,
        raasiId: obj.raasiId ? obj.raasiId : null,
        isMaglik: obj.isMaglik ? obj.isMaglik : null,
        description: obj.description ? obj.description : null,
        hobbies: obj.hobbies ? obj.hobbies.split('|') : null,
        monthlyIncome: obj.monthlyIncome ? obj.monthlyIncome : null,
        createdIp: ip,
        modifiedIp: ip,
        createdBy: adminId,
        modifiedBy: adminId,
      })

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

  public async update(id: number, obj: CreateFamilyDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;

    const t = await this.sequelize.transaction();

    try {

      await this.updateData(id, {
        firstName: obj.firstName,
        lastName: obj.lastName,
        middleName: obj.middleName,
        emailId: obj.emailId,
        contactNo: obj.contactNo,
        cityVillageId: obj.familyCityVillageId,
        imagePath: (obj.uploadFiles && obj.uploadFiles.length > 0) ? obj.uploadFiles : null,
        modifiedIp: ip,
        modifiedBy: adminId,
      });

      await this.updateProfileData(id, {
        dateOfBirth: obj.dateOfBirth ? obj.dateOfBirth : null,
        height: obj.height ? obj.height : null,
        weight: obj.weight ? obj.weight : null,
        genderId: obj.genderId ? obj.genderId : null,
        maritalStatusId: obj.maritalStatusId ? obj.maritalStatusId : null,
        religionId: obj.religionId ? obj.religionId : ReligionEnum.HINDU,
        casteId: obj.casteId ? obj.casteId : CasteEnum.SUTHAR,
        gotraId: obj.gotraId ? obj.gotraId : null,
        raasiId: obj.raasiId ? obj.raasiId : null,
        isMaglik: obj.isMaglik ? obj.isMaglik : null,
        description: obj.description ? obj.description : null,
        hobbies: obj.hobbies ? obj.hobbies.split('|') : null,
        monthlyIncome: obj.monthlyIncome ? obj.monthlyIncome : null,
        modifiedIp: ip,
        modifiedBy: adminId,
      })

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

  public async updateActiveFlag(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.familyRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId,
          modifiedIp: ip
        },
        {
          where: {
            familyId: obj.id
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

  public async getFamilyMasterData() {
    const genderList = await this.commonService.getGenderList();
    const gotraList = await this.commonService.getGotraList();
    const educationList = await this.commonService.getEducationDegreeList();
    const maritalStatusList = await this.commonService.getMaritalStatusList();
    const familyCityVillageList = await this.commonService.getFamilyCityVillageList();
    const raasiList = await this.commonService.getRaasiList();
    return {
      code: ServerResponseEnum.SUCCESS,
      message: StringResource.SUCCESS,
      data: {
        gender: genderList,
        gotra: gotraList,
        education: educationList,
        maritalStatus: maritalStatusList,
        familyCityVillage: familyCityVillageList,
        raasi: raasiList,
      }
    }
  }

  public async getDetail(basicObj: GetDetailDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {

      let dataObj = {};

      const basicInfo = await this.fetchFamily(basicObj.id);

      if (basicInfo) {
        const allDetails = await Promise.all([
          this.fetchFamilyProfile(basicObj.id),
          this.fetchFamilyAddiction(basicObj.id),
          this.fetchFamilyEducation(basicObj.id),
          this.fetchFamilyContact(basicObj.id),
          this.fetchFamilyAddresses(basicObj.id),
          this.fetchFamilyBusinesses(basicObj.id),
          this.fetchFamilyServices(basicObj.id)
        ]);

        dataObj['basic_info'] = basicInfo;
        dataObj['profile_info'] = allDetails[0];
        dataObj['addiction_info'] = allDetails[1];
        dataObj['education_info'] = allDetails[2];
        dataObj['contact_number_info'] = allDetails[3];
        dataObj['address_info'] = allDetails[4];
        dataObj['business_info'] = allDetails[5];
        dataObj['service_info'] = allDetails[6];

        res = {
          code: ServerResponseEnum.SUCCESS,
          message: StringResource.SUCCESS,
          data: dataObj
        };
      } else {
        res = {
          code: ServerResponseEnum.WARNING,
          message: StringResource.NO_FAMILY_FOUND,
          data: null
        };
      }
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

  private async findOneByEmailOrContactNumber(emailId: string, contactNumber: string): Promise<TxnFamily> {
    return await this.familyRepository.findOne<TxnFamily>({
      where: {
        [Op.or]: [
          {contactNo: contactNumber},
          {emailId: emailId}
        ]
      }
    });
  }

  private async findOneByEmail(emailId: string): Promise<TxnFamily> {
    return await this.familyRepository.findOne<TxnFamily>({where: {emailId: emailId}});
  }

  private async createData(obj: any) {
    return await this.familyRepository.create(obj);
  }

  private async updateData(id: number, obj: any) {
    return await this.familyRepository.update(obj, {where: {familyId: id}});
  }

  private async createProfileData(obj: any) {
    return await this.familyProfileRepository.create(obj);
  }

  private async updateProfileData(id: number, obj: any) {
    return await this.familyProfileRepository.update(obj, {where: {familyId: id}});
  }

  private async fetchFamily(familyId: number): Promise<IFamilyList | null> {
    const detail = await this.familyRepository.findOne<TxnFamily>({
      include: [
        {
          model: MstAdminUser,
          required: false,
          as: 'ApprovedBy',
          attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
        },
        {
          model: MstAdminUser,
          required: true,
          as: 'CreatedBy',
          attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE,
        },
        {
          model: MstAdminUser,
          required: true,
          as: 'ModifiedBy',
          attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE,
        },
        {
          model: MstCityVillage,
          required: true,
          as: 'AppUserCityVillage',
          attributes: ['cityVillage']
        }
      ],
      where: {
        familyId: familyId
      },
      raw: true,
      nest: true
    });
    if (detail) {
      return <IFamilyList>{
        familyId: detail.familyId,
        firstName: detail.firstName,
        middleName: detail.middleName,
        lastName: detail.lastName,
        imagePath: CommonFunctionsUtil.getImagesObj(detail.imagePath),
        emailId: detail.emailId,
        contactNo: detail.contactNo,
        cityVillageId: detail.cityVillageId,
        cityVillage: detail['AppUserCityVillage']['cityVillage'],
        active: detail.active,
        isApproved: detail.isApproved,
        createdBy: CommonFunctionsUtil.getAdminShortInfo(detail['CreatedBy'], 'CreatedBy'),
        updatedBy: CommonFunctionsUtil.getAdminShortInfo(detail['ModifiedBy'], 'ModifiedBy'),
        approvedBy: CommonFunctionsUtil.getAdminShortInfo(detail['ApprovedBy'], 'ApprovedBy'),
        createdAt: moment(detail.createdAt).format(DEFAULT_DATE_TIME_FORMAT),
        updatedAt: moment(detail.updatedAt).format(DEFAULT_DATE_TIME_FORMAT)
      };
    }
    return null;
  }

  private async fetchFamilyProfile(familyId: number): Promise<FamilyProfileInterface | null> {
    const detail = await this.familyProfileRepository.findOne<TxnFamilyProfile>({
      include: [
        {
          model: MstAdminUser,
          required: true,
          as: 'CreatedBy',
          attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE,
        },
        {
          model: MstAdminUser,
          required: true,
          as: 'ModifiedBy',
          attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE,
        },
        {
          model: MstMaritalStatus,
          required: false,
          as: 'FamilyProfileMaritalStatus',
          attributes: ['maritalStatus']
        },
        {
          model: MstReligion,
          required: false,
          as: 'FamilyProfileReligion',
          attributes: ['religion']
        },
        {
          model: MstGender,
          required: false,
          as: 'FamilyProfileGender',
          attributes: ['gender']
        },
        {
          model: MstCaste,
          required: false,
          as: 'FamilyProfileCaste',
          attributes: ['caste']
        },
        {
          model: MstGotra,
          required: false,
          as: 'FamilyProfileGotra',
          attributes: ['gotra']
        },
        {
          model: MstRaasi,
          required: false,
          as: 'FamilyProfileRaasi',
          attributes: ['raasi']
        }
      ],
      where: {
        familyId: familyId
      },
      nest: true,
      raw: true
    });
    if (detail) {
      return <FamilyProfileInterface>{
        familyId: detail.familyId,
        dateOfBirth: detail.dateOfBirth ? moment(detail.dateOfBirth).format(DEFAULT_DATE_FORMAT) : '',
        height: detail.height,
        weight: detail.weight,
        genderId: detail.genderId,
        maritalStatusId: detail.maritalStatusId,
        religionId: detail.religionId,
        casteId: detail.casteId,
        gotraId: detail.genderId,
        raasiId: detail.raasiId,
        gender: detail['FamilyProfileGender'] ? detail['FamilyProfileGender']['gender'] : '',
        maritalStatus: detail['FamilyProfileMaritalStatus'] ? detail['FamilyProfileMaritalStatus']['maritalStatus'] : '',
        religion: detail['FamilyProfileReligion'] ? detail['FamilyProfileReligion']['religion'] : '',
        caste: detail['FamilyProfileCaste'] ? detail['FamilyProfileCaste']['caste'] : '',
        gotra: detail['FamilyProfileGotra'] ? detail['FamilyProfileGotra']['gotra'] : '',
        raasi: detail['FamilyProfileRaasi'] ? detail['FamilyProfileRaasi']['raasi'] : '',
        isMaglik: detail.isMaglik,
        description: detail.description,
        hobbies: <string[]>detail.hobbies,
        monthlyIncome: detail.monthlyIncome,
        createdBy: CommonFunctionsUtil.getAdminShortInfo(detail['CreatedBy'], 'CreatedBy'),
        updatedBy: CommonFunctionsUtil.getAdminShortInfo(detail['ModifiedBy'], 'ModifiedBy'),
        createdAt: moment(detail.createdAt).format(DEFAULT_DATE_TIME_FORMAT),
        updatedAt: moment(detail.updatedAt).format(DEFAULT_DATE_TIME_FORMAT)
      };
    }
    return null;
  }

  // region : Addiction
  private async fetchFamilyAddiction(familyId: number): Promise<IFamilyAddiction[] | null> {
    try {
      const list = await this.familyAddictionMappingRepository.findAll<TxnFamilyAddictionMapping>({
        include: [
          {
            model: MstAddiction,
            required: true,
            as: 'FamilyAddiction',
            attributes: ['addiction']
          },
          {
            model: MstAdminUser,
            required: true,
            as: 'ModifiedBy',
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE,
          },
          {
            model: MstAdminUser,
            required: true,
            as: 'CreatedBy',
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE,
          },
        ],
        where: {
          familyId: familyId
        },
        nest: true,
        raw: true
      });
      if (!list || list.length === 0) {
        return null;
      }
      const tempList: IFamilyAddiction[] = [];
      for (const s of list) {
        tempList.push(<IFamilyAddiction>{
          familyId: s.familyId,
          addictionId: s.addictionId,
          addiction: s['FamilyAddiction']['addiction'],
          active: s.active,
          createdBy: CommonFunctionsUtil.getAdminShortInfo(s['CreatedBy'], 'CreatedBy'),
          updatedBy: CommonFunctionsUtil.getAdminShortInfo(s['ModifiedBy'], 'ModifiedBy'),
          createdAt: moment(s.createdAt).format(DEFAULT_DATE_TIME_FORMAT),
          updatedAt: moment(s.updatedAt).format(DEFAULT_DATE_TIME_FORMAT)
        });
      }
      return tempList;
    } catch (e) {
      throw e;
    }
  }

  // endregion

  // region : Education
  private async createFamilyEducationData(obj: any) {
    return await this.familyEducationRepository.create(obj);
  }

  private async fetchFamilyEducation(familyId: number): Promise<IFamilyEducation[] | null> {
    try {
      const list = await this.familyEducationRepository.findAll<TxnFamilyEducation>({
        include: [
          {
            model: MstEducationDegree,
            required: true,
            as: 'FamilyEducation',
            attributes: ['educationDegree']
          },
          {
            model: MstAdminUser,
            required: true,
            as: 'ModifiedBy',
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE,
          },
          {
            model: MstAdminUser,
            required: true,
            as: 'CreatedBy',
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE,
          },
        ],
        where: {
          familyId: familyId
        },
        nest: true,
        raw: true
      });
      if (!list || list.length === 0) {
        return null;
      }
      const tempList: IFamilyEducation[] = [];
      for (const s of list) {
        tempList.push(<IFamilyEducation>{
          familyId: s.familyId,
          educationDegreeId: s.educationDegreeId,
          educationDegree: s['FamilyEducation']['educationDegree'],
          scoredMarks: s.scoredMarks,
          active: s.active,
          createdBy: CommonFunctionsUtil.getAdminShortInfo(s['CreatedBy'], 'CreatedBy'),
          updatedBy: CommonFunctionsUtil.getAdminShortInfo(s['ModifiedBy'], 'ModifiedBy'),
          createdAt: moment(s.createdAt).format(DEFAULT_DATE_TIME_FORMAT),
          updatedAt: moment(s.updatedAt).format(DEFAULT_DATE_TIME_FORMAT)
        });
      }
      return tempList;
    } catch (e) {
      throw e;
    }
  }

  // endregion

  // region : Contact Detail
  public async getFamilyContactNumbers(obj: GetDetailDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const basicInfo = await this.fetchFamilyContact(obj.id);

      if (basicInfo && basicInfo.length > 0) {
        res = {
          code: ServerResponseEnum.SUCCESS,
          message: StringResource.SUCCESS,
          data: basicInfo
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
      console.log(e);
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async createContactNumber(basicObj: FamilyContactNumberDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {

      const checkIf = await this.familyContactNumberRepository.findOne({
        where: {
          contactNumber: basicObj.contactNumber,
          countryCode: basicObj.countryCode
        }
      });
      if (checkIf) {
        if (checkIf.familyId !== basicObj.familyId) {
          res = {
            code: ServerResponseEnum.WARNING,
            message: StringResource.CONTACT_NUMBER_ALREADY_PRESENT,
            data: null
          };
          return res;
        }
        if (checkIf.familyId === basicObj.familyId && !checkIf.active) {
          const update = await this.familyContactNumberRepository.update({
            active: true,
            contactTypeId: basicObj.contactTypeId,
            modifiedBy: adminId,
            modifiedIp: ip
          }, {
            where: {
              familyContactNumberId: checkIf.familyContactNumberId
            }
          });
          if (update) {
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
            };
          }
          return res;
        }
        if(checkIf.familyId === basicObj.familyId && checkIf.active){
          const update = await this.familyContactNumberRepository.update({
            contactTypeId: basicObj.contactTypeId,
            modifiedBy: adminId,
            modifiedIp: ip
          }, {
            where: {
              familyContactNumberId: checkIf.familyContactNumberId
            }
          });
          if (update) {
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
            };
          }
          return res;
        }
      }

      const obj: any = {
        familyId: basicObj.familyId,
        contactTypeId: basicObj.contactTypeId,
        contactNumber: basicObj.contactNumber,
        countryCode: basicObj.countryCode,
        active: true,
        createdBy: adminId,
        modifiedBy: adminId,
        createdIp: ip,
        modifiedIp: ip
      }

      const tempObj = await this.familyContactNumberRepository.create(obj);

      if (tempObj) {
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

  public async updateContactNumber(id:number, basicObj: FamilyContactNumberDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {

      const checkIf = await this.familyContactNumberRepository.findOne({
        where: {
          contactNumber: basicObj.contactNumber,
          countryCode: basicObj.countryCode
        },
        raw:true
      });
      if (checkIf) {
        if (checkIf.familyId !== basicObj.familyId) {
          res = {
            code: ServerResponseEnum.WARNING,
            message: StringResource.CONTACT_NUMBER_ALREADY_PRESENT,
            data: null
          };
          return res;
        }
        if (checkIf.familyId === basicObj.familyId && !checkIf.active) {
          const update = await this.familyContactNumberRepository.update({
            active: true,
            contactTypeId: basicObj.contactTypeId,
            modifiedBy: adminId,
            modifiedIp: ip
          }, {
            where: {
              familyContactNumberId: checkIf.familyContactNumberId
            }
          });
          if (update) {
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
            };
          }
          return res;
        }
        if(checkIf.familyId === basicObj.familyId && checkIf.active){
          const update = await this.familyContactNumberRepository.update({
            contactTypeId: basicObj.contactTypeId,
            modifiedBy: adminId,
            modifiedIp: ip
          }, {
            where: {
              familyContactNumberId: checkIf.familyContactNumberId
            }
          });
          if (update) {
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
            };
          }
          return res;
        }
      }

      const update = await this.familyContactNumberRepository.update({
        contactNumber: basicObj.contactNumber,
        countryCode: basicObj.countryCode,
        contactTypeId: basicObj.contactTypeId,
        modifiedBy: adminId,
        modifiedIp: ip
      }, {
        where: {
          familyContactNumberId: id
        }
      });
      if (update) {
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
        };
      }
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

  public async deleteContactNumber(id: number, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const update = await this.familyContactNumberRepository.update({
        active: false,
        modifiedBy: adminId,
        modifiedIp: ip
      }, {
        where: {
          familyContactNumberId: id
        }
      });
      if (update) {
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

  private async fetchFamilyContact(familyId: number): Promise<IFamilyContactDetail[] | null> {
    try {
      const list = await this.familyContactNumberRepository.findAll<TxnFamilyContactNumber>({
        include: [
          {
            model: MstContactType,
            required: true,
            as: 'FamilyContactNumberContactType',
            attributes: ['contactType']
          },
          {
            model: MstAdminUser,
            required: true,
            as: 'ModifiedBy',
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE,
          },
          {
            model: MstAdminUser,
            required: true,
            as: 'CreatedBy',
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE,
          },
        ],
        where: {
          familyId: familyId,
          active:true
        },
        nest: true,
        raw: true
      });
      if (!list || list.length === 0) {
        return null;
      }
      const tempList: IFamilyContactDetail[] = [];
      for (const s of list) {
        tempList.push(<IFamilyContactDetail>{
          familyContactNumberId: s.familyContactNumberId,
          familyId: s.familyId,
          contactTypeId: s.contactTypeId,
          contactType: s['FamilyContactNumberContactType']['contactType'],
          contactNumber: s.contactNumber,
          countryCode: s.countryCode,
          active: s.active,
          createdBy: CommonFunctionsUtil.getAdminShortInfo(s['CreatedBy'], 'CreatedBy'),
          updatedBy: CommonFunctionsUtil.getAdminShortInfo(s['ModifiedBy'], 'ModifiedBy'),
          createdAt: moment(s.createdAt).format(DEFAULT_DATE_TIME_FORMAT),
          updatedAt: moment(s.updatedAt).format(DEFAULT_DATE_TIME_FORMAT)
        });
      }
      return tempList;
    } catch (e) {
      throw e
    }
  }

  // endregion

  // region : Address
  private async fetchFamilyAddresses(familyId: number): Promise<IAddress[] | null> {
    try {
      return await this.commonService.findAddresses(TableEnum.TXN_FAMILY, familyId);
    } catch (e) {
      throw e;
    }
  }

  // endregion

  // region : Business
  private async fetchFamilyBusinesses(familyId: number): Promise<IFamilyBusiness[] | null> {
    try {
      const list = await this.familyBusinessMappingRepository.findAll<TxnFamilyBusinessMapping>({
        include: [
          {
            model: TxnFamilyBusiness,
            required: true,
            as: 'FamilyBusinessMapping',
            attributes: ['familyBusinessId', 'businessId', 'addressId', 'websiteLink', 'contactNumber', 'emailId', 'bannerPath'],
            include: [
              {
                model: MstBusiness,
                required: true,
                as: 'FamilyBusiness',
                attributes: ['business']
              }
            ]
          },
          {
            model: MstAdminUser,
            required: true,
            as: 'ModifiedBy',
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE,
          },
          {
            model: MstAdminUser,
            required: true,
            as: 'CreatedBy',
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE,
          },
        ],
        where: {
          familyId: familyId
        },
        nest: true,
        raw: true
      });
      if (!list || list.length === 0) {
        return null;
      }
      const tempList: IFamilyBusiness[] = [];
      for (const s of list) {
        tempList.push(<IFamilyBusiness>{
          familyBusinessMappingId: s.familyBusinessMappingId,
          familyId: s.familyId,
          familyBusinessId: s.familyBusinessId,
          business: s['FamilyBusinessMapping']['FamilyBusiness']['business'],
          businessId: s['FamilyBusinessMapping']['businessId'],
          websiteLink: s['FamilyBusinessMapping']['websiteLink'],
          contactNumber: s['FamilyBusinessMapping']['contactNumber'],
          emailId: s['FamilyBusinessMapping']['emailId'],
          bannerPath: CommonFunctionsUtil.getImagesObj(s['FamilyBusinessMapping']['bannerPath']),
          active: s.active,
          createdBy: CommonFunctionsUtil.getAdminShortInfo(s['CreatedBy'], 'CreatedBy'),
          updatedBy: CommonFunctionsUtil.getAdminShortInfo(s['ModifiedBy'], 'ModifiedBy'),
          createdAt: moment(s.createdAt).format(DEFAULT_DATE_TIME_FORMAT),
          updatedAt: moment(s.updatedAt).format(DEFAULT_DATE_TIME_FORMAT)
        });
      }
      return tempList;
    } catch (e) {
      throw e
    }
  }

  // endregion

  // region : Service
  private async fetchFamilyServices(familyId: number): Promise<IFamilyService[] | null> {
    try {
      const list = await this.familyServiceRepository.findAll<TxnFamilyService>({
        include: [
          {
            model: MstService,
            required: true,
            as: 'FamilyService',
            attributes: ['service', 'imagePath']
          },
          {
            model: MstAdminUser,
            required: true,
            as: 'ModifiedBy',
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE,
          },
          {
            model: MstAdminUser,
            required: true,
            as: 'CreatedBy',
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE,
          },
        ],
        where: {
          familyId: familyId
        },
        nest: true,
        raw: true
      });
      if (!list || list.length === 0) {
        return null;
      }
      const tempList: IFamilyService[] = [];
      for (const s of list) {
        tempList.push(<IFamilyService>{
          familyServiceId: s.familyServiceId,
          familyId: s.familyId,
          serviceId: s.serviceId,
          service: s['FamilyService']['service'],
          imagePath: s['FamilyService']['imagePath'],
          jobProfile: s.jobProfile,
          jobDescription: s.jobDescription,
          active: s.active,
          createdBy: CommonFunctionsUtil.getAdminShortInfo(s['CreatedBy'], 'CreatedBy'),
          updatedBy: CommonFunctionsUtil.getAdminShortInfo(s['ModifiedBy'], 'ModifiedBy'),
          createdAt: moment(s.createdAt).format(DEFAULT_DATE_TIME_FORMAT),
          updatedAt: moment(s.updatedAt).format(DEFAULT_DATE_TIME_FORMAT)
        });
      }
      return tempList;
    } catch (e) {
      throw e
    }
  }

  // endregion
}
