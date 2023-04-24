import {
  ADDRESS_REPOSITORY,
  ADDRESS_TYPE_REPOSITORY,
  ADMIN_ROLE_REPOSITORY,
  CITY_VILLAGE_REPOSITORY, CONTACT_TYPE_REPOSITORY,
  COUNTRY_REPOSITORY,
  DISTRICT_REPOSITORY,
  EDUCATION_DEGREE_REPOSITORY, FAMILY_REPOSITORY,
  GENDER_REPOSITORY,
  GOTRA_REPOSITORY,
  LOG_ERROR,
  MARITAL_STATUS_REPOSITORY, RAASI_REPOSITORY,
  STATE_REPOSITORY,
} from '../../constants/config-constants';
import {TxnAddress} from '../../core/database/models/txn-address.model';
import {MstCityVillage} from '../../core/database/models/mst-city-village.model';
import {MstDistrict} from '../../core/database/models/mst-district.model';
import {MstState} from '../../core/database/models/mst-state.model';
import {MstCountry} from '../../core/database/models/mst-country.model';
import {MstEducationDegree} from '../../core/database/models/mst-education-degree.model';
import {MstGotra} from '../../core/database/models/mst-gotra.model';
import {MstGender} from '../../core/database/models/mst-gender.model';
import {MstMaritalStatus} from '../../core/database/models/mst-marital-status.model';
import {LogError} from '../../core/database/models/log-error.model';
import {MstAdminRole} from '../../core/database/models/mst-admin-role.model';
import {MstAddressType} from '../../core/database/models/mst-address-type.model';
import {TxnFamily} from "../../core/database/models/txn-family.model";
import {MstContactType} from "../../core/database/models/mst-contact-type.model";
import {MstRaasi} from "../../core/database/models/mst-raasi.model";

export const commonProvider = [
  {
    provide: ADDRESS_REPOSITORY,
    useValue: TxnAddress,
  },
  {
    provide: CITY_VILLAGE_REPOSITORY,
    useValue: MstCityVillage,
  },
  {
    provide: DISTRICT_REPOSITORY,
    useValue: MstDistrict,
  },
  {
    provide: STATE_REPOSITORY,
    useValue: MstState,
  },
  {
    provide: COUNTRY_REPOSITORY,
    useValue: MstCountry,
  },
  {
    provide: GENDER_REPOSITORY,
    useValue: MstGender,
  },
  {
    provide: GOTRA_REPOSITORY,
    useValue: MstGotra,
  },
  {
    provide: EDUCATION_DEGREE_REPOSITORY,
    useValue: MstEducationDegree,
  },
  {
    provide: MARITAL_STATUS_REPOSITORY,
    useValue: MstMaritalStatus,
  },
  {
    provide: LOG_ERROR,
    useValue: LogError,
  },
  {
    provide: ADMIN_ROLE_REPOSITORY,
    useValue: MstAdminRole,
  },
  {
    provide: ADDRESS_TYPE_REPOSITORY,
    useValue: MstAddressType,
  },
  {
    provide: FAMILY_REPOSITORY,
    useValue: TxnFamily,
  },
  {
    provide: CONTACT_TYPE_REPOSITORY,
    useValue: MstContactType,
  },
  {
    provide: RAASI_REPOSITORY,
    useValue: MstRaasi,
  },
];
