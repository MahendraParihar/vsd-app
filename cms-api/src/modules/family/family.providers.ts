import {TxnFamily} from '../../core/database/models/txn-family.model';
import {TxnFamilyProfile} from '../../core/database/models/txn-family-profile.model';
import {TxnFamilyEducation} from '../../core/database/models/txn-family-education.model';
import {TxnFamilyBusiness} from '../../core/database/models/txn-family-business.model';
import {TxnFamilyBusinessMapping} from '../../core/database/models/txn-family-business-mapping.model';
import {TxnFamilyAddictionMapping} from '../../core/database/models/txn-family-addiction-mapping.model';
import {TxnFamilyContactNumber} from '../../core/database/models/txn-family-contact-number.model';
import {TxnFamilyRelationshipMapping} from '../../core/database/models/txn-family-relationship-mapping.model';
import {
  FAMILY_ADDICTION_REPOSITORY,
  FAMILY_BUSINESS_MAPPING_REPOSITORY,
  FAMILY_BUSINESS_REPOSITORY,
  FAMILY_CONTACT_NUMBER_REPOSITORY,
  FAMILY_EDUCATION_REPOSITORY,
  FAMILY_PROFILE_REPOSITORY,
  FAMILY_RELATIONSHIP_REPOSITORY,
  FAMILY_REPOSITORY, FAMILY_SERVICE_REPOSITORY
} from '../../constants/config-constants';
import {TxnFamilyService} from "../../core/database/models/txn-family-service.model";

export const familyProvider = [
  {
    provide: FAMILY_REPOSITORY,
    useValue: TxnFamily
  },
  {
    provide: FAMILY_PROFILE_REPOSITORY,
    useValue: TxnFamilyProfile
  },
  {
    provide: FAMILY_EDUCATION_REPOSITORY,
    useValue: TxnFamilyEducation
  },
  {
    provide: FAMILY_BUSINESS_REPOSITORY,
    useValue: TxnFamilyBusiness
  },
  {
    provide: FAMILY_BUSINESS_MAPPING_REPOSITORY,
    useValue: TxnFamilyBusinessMapping
  },
  {
    provide: FAMILY_SERVICE_REPOSITORY,
    useValue: TxnFamilyService
  },
  {
    provide: FAMILY_CONTACT_NUMBER_REPOSITORY,
    useValue: TxnFamilyContactNumber
  },
  {
    provide: FAMILY_ADDICTION_REPOSITORY,
    useValue: TxnFamilyAddictionMapping
  },
  {
    provide: FAMILY_RELATIONSHIP_REPOSITORY,
    useValue: TxnFamilyRelationshipMapping
  }
];
