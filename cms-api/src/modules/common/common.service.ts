import {Inject, Injectable} from '@nestjs/common';
import {
  ADDRESS_REPOSITORY,
  ADDRESS_TYPE_REPOSITORY,
  ADMIN_ROLE_REPOSITORY,
  CITY_VILLAGE_REPOSITORY, CONTACT_TYPE_REPOSITORY,
  COUNTRY_REPOSITORY,
  DISTRICT_REPOSITORY,
  EDUCATION_DEGREE_REPOSITORY, FAMILY_IMAGE_PATH,
  FAMILY_REPOSITORY,
  GENDER_REPOSITORY,
  GOTRA_REPOSITORY,
  IN_COUNTRY,
  MARITAL_STATUS_REPOSITORY, RAASI_REPOSITORY,
  RJ_STATE,
  STATE_REPOSITORY,
} from '../../constants/config-constants';
import {TxnAddress} from '../../core/database/models/txn-address.model';
import {MstCityVillage} from '../../core/database/models/mst-city-village.model';
import {MstDistrict} from '../../core/database/models/mst-district.model';
import {MstState} from '../../core/database/models/mst-state.model';
import {MstCountry} from '../../core/database/models/mst-country.model';
import {IAddress} from '../../response-interface/address.interface';
import {DropdownListInterface, MultiTextDropdownListInterface} from '../../response-interface/dropdown-list.interface';
import {MstGotra} from '../../core/database/models/mst-gotra.model';
import {MstEducationDegree} from '../../core/database/models/mst-education-degree.model';
import {MstGender} from '../../core/database/models/mst-gender.model';
import {MstMaritalStatus} from '../../core/database/models/mst-marital-status.model';
import {MstAdminRole} from '../../core/database/models/mst-admin-role.model';
import {AppUserStatusEnum} from '../../enums/app-user-status';
import {MstAddressType} from "../../core/database/models/mst-address-type.model";
import {TxnFamily} from "../../core/database/models/txn-family.model";
import {Op} from "sequelize";
import {CommonFunctionsUtil} from "../../util/common-functions-util";
import {MstContactType} from "../../core/database/models/mst-contact-type.model";
import {MstRaasi} from "../../core/database/models/mst-raasi.model";

@Injectable()
export class CommonService {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private readonly addressRepository: typeof TxnAddress,
    @Inject(CITY_VILLAGE_REPOSITORY)
    private readonly cityVillageRepository: typeof MstCityVillage,
    @Inject(DISTRICT_REPOSITORY)
    private readonly districtRepository: typeof MstDistrict,
    @Inject(STATE_REPOSITORY) private readonly stateRepository: typeof MstState,
    @Inject(COUNTRY_REPOSITORY)
    private readonly countryRepository: typeof MstCountry,
    @Inject(GENDER_REPOSITORY)
    private readonly genderRepository: typeof MstGender,
    @Inject(GOTRA_REPOSITORY) private readonly gotraRepository: typeof MstGotra,
    @Inject(EDUCATION_DEGREE_REPOSITORY)
    private readonly educationRepository: typeof MstEducationDegree,
    @Inject(ADMIN_ROLE_REPOSITORY)
    private readonly adminRoleRepository: typeof MstAdminRole,
    @Inject(MARITAL_STATUS_REPOSITORY)
    private readonly maritalRepository: typeof MstMaritalStatus,
    @Inject(ADDRESS_TYPE_REPOSITORY)
    private readonly addressTypeRepository: typeof MstAddressType,
    @Inject(FAMILY_REPOSITORY)
    private readonly familyRepository: typeof TxnFamily,
    @Inject(CONTACT_TYPE_REPOSITORY)
    private readonly contactTypeRepository: typeof MstContactType,
    @Inject(RAASI_REPOSITORY)
    private readonly raasiRepository: typeof MstRaasi) {
  }

  // region Address
  public async findAddress(tableIdIn: number, pkOfTableIn: number): Promise<IAddress> {
    try {
      const addressObj = await this.addressRepository.findOne<TxnAddress>({
        where: {
          active: true,
          tableId: tableIdIn,
          pkOfTable: pkOfTableIn,
        },
        include: [
          {
            model: MstCityVillage,
            required: true,
            attributes: ['cityVillage']
          },
          {
            model: MstDistrict,
            required: true,
            attributes: ['district']
          },
          {
            model: MstState,
            required: true,
            attributes: ['state']
          },
          {
            model: MstCountry,
            required: true,
            attributes: ['country'],
          }
        ],
        raw: true,
        nest: true,
        logging: console.log
      });

      if (!addressObj) {
        return null;
      }
      return this.convertDbToAddressObj(addressObj);
    } catch (e) {
      throw e;
    }
  }

  public async findAddresses(tableIdIn: number, pkOfTableIn: number): Promise<IAddress[]> {
    try {
      const addressObjs = await this.addressRepository.findAll<TxnAddress>({
        where: {
          active: true,
          tableId: tableIdIn,
          pkOfTable: pkOfTableIn,
        },
        include: [
          {
            model: MstCityVillage,
            required: true,
            attributes: ['cityVillage']
          },
          {
            model: MstDistrict,
            required: true,
            attributes: ['district']
          },
          {
            model: MstState,
            required: true,
            attributes: ['state']
          },
          {
            model: MstCountry,
            required: true,
            attributes: ['country'],
          }
        ],
        raw: true,
        nest: true,
        logging: console.log
      });

      if (!addressObjs || addressObjs.length === 0) {
        return null;
      }

      const list: IAddress[] = [];
      for (const addressObj of addressObjs) {
        list.push(this.convertDbToAddressObj(addressObj));
      }

      return list;
    } catch (e) {
      throw e;
    }
  }

  public async findAddressById(addressIdIn: number): Promise<IAddress> {
    try {
      const addressObj = await this.addressRepository.findOne<TxnAddress>({
        where: {
          active: true,
          addressId: addressIdIn,
        },
        include: [
          {
            model: MstCityVillage,
            required: true,
            attributes: ['cityVillage']
          },
          {
            model: MstDistrict,
            required: true,
            attributes: ['district']
          },
          {
            model: MstState,
            required: true,
            attributes: ['state']
          },
          {
            model: MstCountry,
            required: true,
            attributes: ['country'],
          }
        ],
        raw: true,
        nest: true,
        logging: console.log
      });

      if (!addressObj) {
        return null;
      }

      return this.convertDbToAddressObj(addressObj)
    } catch (e) {
      throw e;
    }
  }

  public convertDbToAddressObj(addressObj): IAddress {
    if (!addressObj) {
      return null;
    }
    console.log(addressObj);
    return {
      addressId: addressObj.addressId,
      addressTypeId: addressObj.addressTypeId,
      address: addressObj.address,
      cityVillageId: addressObj.cityVillageId,
      cityVillage: addressObj['AddressCityVillage']['cityVillage'],
      districtId: addressObj.districtId,
      district: addressObj['AddressDistrict']['district'],
      stateId: addressObj.stateId,
      state: addressObj['AddressState']['state'],
      countryId: addressObj.countryId,
      country: addressObj['AddressCountry']['country'],
      pinCode: addressObj.pinCode,
      latitude: addressObj.latitude,
      longitude: addressObj.longitude,
    }
  }

  public async addAddress(addressObj: any): Promise<TxnAddress> {
    try {
      const createdObj = await this.addressRepository.create(addressObj);
      if (createdObj) {
        return createdObj;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async updateAddressById(addressId: number, addressObj: any): Promise<TxnAddress> {
    console.log(addressObj);
    try {
      const updateObj = await this.addressRepository.update(addressObj, {
        where: {
          addressId: addressId
        }
      });
      if (updateObj) {
        return updateObj[1][0];
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async updateAddressByTableNPkOfTable(tableId: number, pkOfTable: number, addressObj: any): Promise<TxnAddress> {
    console.log(addressObj);
    try {
      const updateObj = await this.addressRepository.update(addressObj, {
        returning: true,
        where: {
          tableId: tableId,
          pkOfTable: pkOfTable
        }
      });
      if (updateObj) {
        console.log(updateObj);
        return updateObj[1][0];
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async getAddressTypeList(): Promise<DropdownListInterface[]> {
    const tempList = await this.addressTypeRepository.findAll<MstAddressType>({
      where: {
        active: true,
      },
      order: [['addressType', 'ASC']],
    });
    const list: DropdownListInterface[] = [];
    for (const t of tempList) {
      list.push({
        id: t.addressTypeId,
        name: t.addressType,
        selected: false,
      });
    }
    return list;
  }

  // endregion

  // region Contact Type
  public async getContactTypeList(): Promise<DropdownListInterface[]> {
    const tempList = await this.contactTypeRepository.findAll<MstContactType>({
      where: {
        active: true,
      },
      order: [['contactType', 'ASC']],
    });
    const list: DropdownListInterface[] = [];
    for (const t of tempList) {
      list.push({
        id: t.contactTypeId,
        name: t.contactType,
        selected: false,
      });
    }
    return list;
  }
  // endregion

  public async getCountryList(): Promise<DropdownListInterface[]> {
    const tempList = await this.countryRepository.findAll<MstCountry>({
      where: {
        active: true,
      },
      order: [['country', 'ASC']],
    });
    const list: DropdownListInterface[] = [];
    for (const t of tempList) {
      list.push({
        id: t.countryId,
        name: t.country,
        selected: false,
      });
    }
    return list;
  }

  public async getCountryCodeList(): Promise<DropdownListInterface[]> {
    const tempList = await this.countryRepository.findAll<MstCountry>({
      where: {
        active: true,
      },
      order: [['country', 'ASC']],
    });
    const list: DropdownListInterface[] = [];
    for (const t of tempList) {
      list.push({
        id: t.countryCode,
        name: `${t.country} (${t.countryCode})`,
        selected: false,
      });
    }
    return list;
  }

  public async getStateList(): Promise<DropdownListInterface[]> {
    const tempList = await this.stateRepository.findAll<MstState>({
      where: {
        active: true,
      },
      order: [['state', 'ASC']],
    });
    const list: DropdownListInterface[] = [];
    for (const t of tempList) {
      list.push({
        id: t.stateId,
        name: t.state,
        selected: false,
        parentId: t.countryId,
      });
    }
    return list;
  }

  public async getDistrictList(): Promise<DropdownListInterface[]> {
    const tempList = await this.districtRepository.findAll<MstDistrict>({
      where: {
        active: true,
      },
      order: [['district', 'ASC']],
    });
    const list: DropdownListInterface[] = [];
    for (const t of tempList) {
      list.push({
        id: t.districtId,
        name: t.district,
        selected: false,
        parentId: t.stateId,
      });
    }
    return list;
  }

  public async getFamilyCityVillageList(): Promise<DropdownListInterface[]> {
    const tempList = await this.cityVillageRepository.findAll<MstCityVillage>({
      include: [
        {
          model: MstDistrict,
          required: true,
          include: [
            {
              model: MstState,
              required: true,
              where: {
                stateId: RJ_STATE,
                countryId: IN_COUNTRY,
              },
            },
          ],
        },
      ],
      where: {
        active: true,
      },
      order: [['cityVillage', 'ASC']],
    });
    const list: DropdownListInterface[] = [];
    for (const t of tempList) {
      list.push({
        id: t.cityVillageId,
        name: t.cityVillage,
        selected: false,
        parentId: t.districtId,
      });
    }
    return list;
  }

  public async getCityVillageList(): Promise<DropdownListInterface[]> {
    const tempList = await this.cityVillageRepository.findAll<MstCityVillage>({
      where: {
        active: true,
      },
      order: [['cityVillage', 'ASC']],
    });
    const list: DropdownListInterface[] = [];
    for (const t of tempList) {
      list.push({
        id: t.cityVillageId,
        name: t.cityVillage,
        selected: false,
        parentId: t.districtId,
      });
    }
    return list;
  }

  public async getGenderList(): Promise<DropdownListInterface[]> {
    const tempList = await this.genderRepository.findAll<MstGender>({
      where: {
        active: true,
      },
    });
    const list: DropdownListInterface[] = [];
    for (const t of tempList) {
      list.push({
        id: t.genderId,
        name: t.gender,
        selected: false,
      });
    }
    return list;
  }

  public async getGotraList(): Promise<DropdownListInterface[]> {
    const tempList = await this.gotraRepository.findAll<MstGotra>({
      where: {
        active: true,
      },
      order: [['gotra', 'ASC']],
    });
    const list: DropdownListInterface[] = [];
    for (const t of tempList) {
      list.push({
        id: t.gotraId,
        name: t.gotra,
        selected: false,
      });
    }
    return list;
  }

  public async getEducationDegreeList(): Promise<DropdownListInterface[]> {
    const tempList = await this.educationRepository.findAll<MstEducationDegree>(
      {
        where: {
          active: true,
        },
      },
    );
    const list: DropdownListInterface[] = [];
    for (const t of tempList) {
      list.push({
        id: t.educationDegreeId,
        name: t.educationDegree,
        selected: false,
      });
    }
    return list;
  }

  public async getMaritalStatusList(): Promise<DropdownListInterface[]> {
    const tempList = await this.maritalRepository.findAll<MstMaritalStatus>({
      where: {
        active: true,
      },
    });
    const list: DropdownListInterface[] = [];
    for (const t of tempList) {
      list.push({
        id: t.maritalStatusId,
        name: t.maritalStatus,
        selected: false,
      });
    }
    return list;
  }

  public async getRaasiList(): Promise<DropdownListInterface[]> {
    const tempList = await this.raasiRepository.findAll<MstRaasi>({
      where: {
        active: true,
      },
    });
    const list: DropdownListInterface[] = [];
    for (const t of tempList) {
      list.push({
        id: t.raasiId,
        name: t.raasi,
        selected: false,
      });
    }
    return list;
  }

  public async getAdminRoleList(): Promise<DropdownListInterface[]> {
    const tempList = await this.adminRoleRepository.findAll<MstAdminRole>();
    const list: DropdownListInterface[] = [];
    for (const t of tempList) {
      list.push({
        id: t.roleId,
        name: t.role,
        selected: false,
      });
    }
    return list;
  }

  public async getAdminStatsList(): Promise<DropdownListInterface[]> {
    const list: DropdownListInterface[] = [];
    list.push({
      id: AppUserStatusEnum.ACTIVE,
      name: 'Active',
      selected: false,
    });
    list.push({
      id: AppUserStatusEnum.IN_ACTIVE,
      name: 'In-Active',
      selected: false,
    });
    return list;
  }

  public async getUserList(str: string): Promise<DropdownListInterface[]> {
    const list: MultiTextDropdownListInterface[] = [];
    const whereCondition = {
      [Op.or]: [
        {
          firstName: {
            [Op.iLike]: `%${str}%`
          }
        },
        {
          lastName: {
            [Op.iLike]: `%${str}%`
          }
        },
        {
          middleName: {
            [Op.iLike]: `%${str}%`
          }
        }
      ]
    };
    const families = await this.familyRepository.findAll<TxnFamily>({
      attributes: ['familyId', 'firstName', 'middleName', 'lastName', 'imagePath'],
      include: [
        {
          model: MstCityVillage,
          required: true,
          as: 'AppUserCityVillage',
          attributes: ['cityVillage']
        }
      ],
      where: whereCondition,
      order: [
        ['firstName', 'ASC'],
        ['middleName', 'ASC'],
        ['lastName', 'ASC'],
      ],
      limit: 100
    });

    for (const s of families) {
      list.push(<MultiTextDropdownListInterface>{
        id: s.familyId,
        name: `${s.firstName} ${s.middleName} ${s.lastName}`,
        imagePath: CommonFunctionsUtil.getImagesObj(s.imagePath),
        subText: s['AppUserCityVillage']['cityVillage'],
        selected: false,
        parentId: 0
      });
    }
    return list;
  }

  public async getSelectedUserList(userIds: number[]): Promise<DropdownListInterface[]> {
    const list: MultiTextDropdownListInterface[] = [];
    const whereCondition = {
      familyId: {
        [Op.in]: userIds
      }
    };
    const families = await this.familyRepository.findAll<TxnFamily>({
      attributes: ['familyId', 'firstName', 'middleName', 'lastName', 'imagePath'],
      include: [
        {
          model: MstCityVillage,
          required: true,
          as: 'AppUserCityVillage',
          attributes: ['cityVillage']
        }
      ],
      where: whereCondition,
      order: [
        ['firstName', 'ASC'],
        ['middleName', 'ASC'],
        ['lastName', 'ASC'],
      ],
      limit: 100
    });

    for (const s of families) {
      list.push(<MultiTextDropdownListInterface>{
        id: s.familyId,
        name: `${s.firstName} ${s.middleName} ${s.lastName}`,
        imagePath: CommonFunctionsUtil.getImagesObj(s.imagePath),
        subText: s['AppUserCityVillage']['cityVillage'],
        selected: false,
        parentId: 0
      });
    }
    return list;
  }
}
