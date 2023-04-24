import {CURRENT_AFFAIR_REPOSITORY} from '../../core/constants/config-constants';
import {TxnFamily} from '../../core/database/models/txn-family.model';
import {TxnFamilyProfile} from '../../core/database/models/txn-family-profile.model';
import {TxnFamilyEducation} from '../../core/database/models/txn-family-education.model';
import {TxnFamilyService} from '../../core/database/models/txn-family-service.model';
import {TxnFamilyBusiness} from '../../core/database/models/txn-family-business.model';
import {TxnFamilyBusinessMapping} from '../../core/database/models/txn-family-business-mapping.model';
import {TxnFamilyAddictionMapping} from '../../core/database/models/txn-family-addiction-mapping.model';
import {TxnFamilyContactNumber} from '../../core/database/models/txn-family-contact-number.model';
import {TxnFamilyRelationshipMapping} from '../../core/database/models/txn-family-relationship-mapping.model';

export const familyProvider = [
    {
        provide: CURRENT_AFFAIR_REPOSITORY,
        useValue: TxnFamily
    },
    {
        provide: CURRENT_AFFAIR_REPOSITORY,
        useValue: TxnFamilyProfile
    },
    {
        provide: CURRENT_AFFAIR_REPOSITORY,
        useValue: TxnFamilyEducation
    },
    {
        provide: CURRENT_AFFAIR_REPOSITORY,
        useValue: TxnFamilyService
    },
    {
        provide: CURRENT_AFFAIR_REPOSITORY,
        useValue: TxnFamilyBusiness
    },
    {
        provide: CURRENT_AFFAIR_REPOSITORY,
        useValue: TxnFamilyBusinessMapping
    },
    {
        provide: CURRENT_AFFAIR_REPOSITORY,
        useValue: TxnFamilyContactNumber
    },
    {
        provide: CURRENT_AFFAIR_REPOSITORY,
        useValue: TxnFamilyAddictionMapping
    },
    {
        provide: CURRENT_AFFAIR_REPOSITORY,
        useValue: TxnFamilyRelationshipMapping
    }
];