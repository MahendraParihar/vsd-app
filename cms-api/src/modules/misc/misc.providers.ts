import {TxnLegalPages} from '../../core/database/models/txn-legal-pages.model';
import {TxnFaq} from '../../core/database/models/txn-faq.model';
import {
  FAQ_CATEGORY_REPOSITORY,
  FAQ_REPOSITORY,
  INQUIRY_REPOSITORY,
  LEGAL_PAGE_REPOSITORY
} from '../../constants/config-constants';
import {TxnInquiry} from '../../core/database/models/txn-inquiry.model';
import {MstFaqCategory} from "../../core/database/models/mst-faq-category.model";

export const miscProvider = [
  {
    provide: FAQ_REPOSITORY,
    useValue: TxnFaq
  }, {
    provide: FAQ_CATEGORY_REPOSITORY,
    useValue: MstFaqCategory
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
