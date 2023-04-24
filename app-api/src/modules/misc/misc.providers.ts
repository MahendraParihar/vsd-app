import {MstMandal} from '../../core/database/models/mst-mandal.model';
import {TxnMandalMember} from '../../core/database/models/txn-mandal-member.model';
import {TxnTrustee} from '../../core/database/models/txn-trustee.model';
import {MstTemple} from '../../core/database/models/mst-temple.model';
import {MstFaqCategory} from '../../core/database/models/mst-faq-category.model';
import {TxnLegalPages} from '../../core/database/models/txn-legal-pages.model';
import {TxnFaq} from '../../core/database/models/txn-faq.model';
import {
    FAQ_CATEGORY_REPOSITORY,
    FAQ_REPOSITORY, INQUIRY_REPOSITORY,
    LEGAL_PAGE_REPOSITORY,
    MANDAL_MEMBER_REPOSITORY,
    MANDAL_REPOSITORY,
    TEMPLE_REPOSITORY,
    TRUSTEE_REPOSITORY
} from '../../core/constants/config-constants';
import {TxnInquiry} from '../../core/database/models/txn-inquiry.model';

export const miscAffairProvider = [
    {
        provide: MANDAL_REPOSITORY,
        useValue: MstMandal
    },
    {
        provide: MANDAL_MEMBER_REPOSITORY,
        useValue: TxnMandalMember
    },
    {
        provide: TRUSTEE_REPOSITORY,
        useValue: TxnTrustee
    },
    {
        provide: TEMPLE_REPOSITORY,
        useValue: MstTemple
    },
    {
        provide: FAQ_CATEGORY_REPOSITORY,
        useValue: MstFaqCategory
    },
    {
        provide: FAQ_REPOSITORY,
        useValue: TxnFaq
    },
    {
        provide: LEGAL_PAGE_REPOSITORY,
        useValue: TxnLegalPages
    },
    {
        provide: INQUIRY_REPOSITORY,
        useValue: TxnInquiry
    }
];