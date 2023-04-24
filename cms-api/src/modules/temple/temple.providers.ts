import {MstTemple} from '../../core/database/models/mst-temple.model';
import {ADDRESS_REPOSITORY, TEMPLE_REPOSITORY} from '../../constants/config-constants';
import {TxnAddress} from "../../core/database/models/txn-address.model";

export const templeProvider = [
  {
    provide: TEMPLE_REPOSITORY,
    useValue: MstTemple
  },
  {
    provide: ADDRESS_REPOSITORY,
    useValue: TxnAddress
  }
];
