import {Inject, Injectable} from '@nestjs/common';
import {PagingDto} from '../../common-dto/paging.dto';
import {EventListInterface} from '../../response-interface/event-list.interface';
import {TxnEvent} from '../../core/database/models/txn-event.model';
import {
    DEFAULT_DATE_FORMAT,
    DEFAULT_PAGE_SIZE,
    EVENT_COORDINATE_REPOSITORY,
    EVENT_INTEREST_MEMBER_REPOSITORY,
    EVENT_REPOSITORY,
    IS_DEV
} from '../../core/constants/config-constants';
import {TxnEventCoordinator} from '../../core/database/models/txn-event-coordinator.model';
import {TxnEventInterestedMember} from '../../core/database/models/txn-event-interested-member.model';
import {Sequelize} from 'sequelize-typescript';
import {EventBasicDto, EventInterestedFlagDto} from './dto/event.dto';
import {IServerResponse} from '../../common-dto/response-interface';
import {ServerResponseEnum} from '../../enums/server-response-enum';
import {StringResource} from '../../enums/string-resource';
import * as moment from 'moment';
import {Op} from 'sequelize';
import {CommonService} from '../common/common.service';

@Injectable()
export class EventService {

    constructor(@Inject(EVENT_REPOSITORY) private readonly eventRepository: typeof TxnEvent,
                @Inject(EVENT_COORDINATE_REPOSITORY) private readonly eventCoordiantorRepository: typeof TxnEventCoordinator,
                @Inject(EVENT_INTEREST_MEMBER_REPOSITORY) private readonly eventInterestedMemberRepository: typeof TxnEventInterestedMember,
                private sequelize: Sequelize,
                private commonService: CommonService) {

    }

    public async findAllUpcomingEvents(pagingDto: PagingDto): Promise<IServerResponse> {
        let res: IServerResponse;
        try {
            const pageNumber = pagingDto.pageNumber;
            let offset = pageNumber === 0 ? 0 : (pageNumber * DEFAULT_PAGE_SIZE);
            const fromDate = moment().format('YYYY-MM-DD');
            const toDate = moment().add(365, 'days').format('YYYY-MM-DD');
            const list = await this.eventRepository.findAll<TxnEvent>({
                attributes: ['eventId', 'title', 'date', 'time', 'imagePath', 'addressId', 'visitedCount', 'urlPath', 'noOfDays'],
                where: {
                    active: true,
                    date: {
                        [Op.between]: [fromDate, toDate]
                    }
                },
                order: [
                    ['date', 'ASC'],
                    ['time', 'ASC'],
                ],
                offset: offset,
                limit: DEFAULT_PAGE_SIZE
            });

            if (!list || list.length === 0) {
                res = {
                    code: ServerResponseEnum.WARNING,
                    message: StringResource.NO_EVENT_FOUND,
                    data: null
                };
                return res;
            }

            const resList: EventListInterface[] = [];
            for (const s of list) {
                const iObj: EventListInterface = {
                    eventId: s.eventId,
                    title: s.title,
                    imagePath: s.imagePath,
                    date: moment(s.date).format(DEFAULT_DATE_FORMAT),
                    time: s.time,
                    urlPath: s.urlPath,
                    visitedCount: s.visitedCount
                };
                resList.push(iObj);
            }

            res = {
                code: ServerResponseEnum.SUCCESS,
                message: StringResource.SUCCESS,
                data: resList
            };

            return res;

        } catch (e) {
            res = {
                code: ServerResponseEnum.ERROR,
                message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
                data: null
            };
            return res;
        }
    }

    public async fetchDetailById(eventId: EventBasicDto): Promise<IServerResponse> {

        let res: IServerResponse;
        try {
            const event = await this.eventRepository.findOne<TxnEvent>({
                attributes: [
                    'eventId', 'title', 'date', 'time', 'imagePath',
                    'addressId', 'visitedCount', 'urlPath', 'noOfDays',
                    'downloadPath', 'agenda'
                ],
                where: {
                    active: true,
                    eventId: eventId.eventId
                }
            });
            if (event) {

                if (event['addressId'] && event['addressId'] > 0) {
                    const eventAddress = this.commonService.findAddressById(event['addressId']);
                    console.log(eventAddress);
                }

                res = {
                    code: ServerResponseEnum.SUCCESS,
                    message: StringResource.SUCCESS,
                    data: event
                };
            } else {
                res = {
                    code: ServerResponseEnum.WARNING,
                    message: StringResource.NO_EVENT_FOUND,
                    data: null
                };
            }
            return res;
        } catch (e) {
            res = {
                code: ServerResponseEnum.ERROR,
                message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
                data: null
            };
            return res;
        }
    }

    public async updateInterestedFlag(obj: EventInterestedFlagDto): Promise<IServerResponse> {
        let res: IServerResponse;
        try {
            return res;
        } catch (e) {
            res = {
                code: ServerResponseEnum.ERROR,
                message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
                data: null
            };
            return res;
        }
    }

}
