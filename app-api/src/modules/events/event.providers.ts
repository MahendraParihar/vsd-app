import {
    EVENT_COORDINATE_REPOSITORY,
    EVENT_INTEREST_MEMBER_REPOSITORY,
    EVENT_REPOSITORY
} from '../../core/constants/config-constants';
import {TxnEvent} from '../../core/database/models/txn-event.model';
import {TxnEventCoordinator} from '../../core/database/models/txn-event-coordinator.model';
import {TxnEventInterestedMember} from '../../core/database/models/txn-event-interested-member.model';

export const eventProvider = [
    {
        provide: EVENT_REPOSITORY,
        useValue: TxnEvent,
    },
    {
        provide: EVENT_COORDINATE_REPOSITORY,
        useValue: TxnEventCoordinator,
    },
    {
        provide: EVENT_INTEREST_MEMBER_REPOSITORY,
        useValue: TxnEventInterestedMember,
    }
];