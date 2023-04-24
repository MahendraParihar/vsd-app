import {TxnCurrentAffair} from '../../core/database/models/txn-current-affair.model';
import {CURRENT_AFFAIR_REPOSITORY} from '../../core/constants/config-constants';

export const currentAffairProvider = [
    {
        provide: CURRENT_AFFAIR_REPOSITORY,
        useValue: TxnCurrentAffair
    }
];