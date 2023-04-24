import {ADDRESS_REPOSITORY} from '../../core/constants/config-constants';
import {TxnAddress} from '../../core/database/models/txn-address.model';

export const commonProvider = [
    {
        provide: ADDRESS_REPOSITORY,
        useValue: TxnAddress,
    }
];