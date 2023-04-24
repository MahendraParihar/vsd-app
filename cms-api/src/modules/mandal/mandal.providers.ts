import {MstMandal} from '../../core/database/models/mst-mandal.model';
import {TxnMandalMember} from '../../core/database/models/txn-mandal-member.model';
import {TxnTrustee} from '../../core/database/models/txn-trustee.model';
import {
  ADDRESS_REPOSITORY,
  MANDAL_MEMBER_REPOSITORY,
  MANDAL_REPOSITORY,
  TRUSTEE_REPOSITORY
} from '../../constants/config-constants';
import {TxnAddress} from "../../core/database/models/txn-address.model";

export const mandalProvider = [
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
    provide: ADDRESS_REPOSITORY,
    useValue: TxnAddress
  }
];
