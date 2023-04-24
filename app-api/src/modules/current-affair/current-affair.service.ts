import {Inject, Injectable} from '@nestjs/common';
import {
    CURRENT_AFFAIR_REPOSITORY, DEFAULT_DATE_FORMAT, DEFAULT_PAGE_SIZE,
    IS_DEV
} from '../../core/constants/config-constants';
import {TxnCurrentAffair} from '../../core/database/models/txn-current-affair.model';
import {PagingDto} from '../../common-dto/paging.dto';
import {IServerResponse} from '../../common-dto/response-interface';
import {ServerResponseEnum} from '../../enums/server-response-enum';
import {StringResource} from '../../enums/string-resource';
import * as moment from 'moment';
import {CurrentAffairBasicDto} from './dto/current-affair.dto';
import {CurrentAffairListInterface} from '../../response-interface/current-affair-list.interface';

@Injectable()
export class CurrentAffairService {
    constructor(@Inject(CURRENT_AFFAIR_REPOSITORY) private readonly currentAffairRepository: typeof TxnCurrentAffair) {

    }

    public async findAllCurrentAffair(pagingDto: PagingDto): Promise<IServerResponse> {
        let res: IServerResponse;
        try {
            const pageNumber = pagingDto.pageNumber;
            let offset = pageNumber === 0 ? 0 : (pageNumber * DEFAULT_PAGE_SIZE);
            const list = await this.currentAffairRepository.findAll<TxnCurrentAffair>({
                attributes: ['currentAffairId', 'title', 'date', 'time', 'imagePath'],
                where: {
                    active: true,
                    isApproved: true
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

            const resList: CurrentAffairListInterface[] = [];
            for (const s of list) {
                const iEvent: CurrentAffairListInterface = {
                    currentAffairId: s.currentAffairId,
                    title: s.title,
                    imagePath: s.imagePath,
                    date: moment(s.date).format(DEFAULT_DATE_FORMAT),
                    time: s.time,
                    visitedCount: s.visitedCount
                };
                resList.push(iEvent);
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

    public async fetchDetailById(currentAffairObj: CurrentAffairBasicDto): Promise<IServerResponse> {

        let res: IServerResponse;
        try {
            const currentAffair = await this.currentAffairRepository.findOne<TxnCurrentAffair>({
                attributes: [
                    'eventId', 'title', 'date', 'time', 'imagePath',
                    'addressId', 'visitedCount', 'urlPath', 'noOfDays',
                    'downloadPath', 'agenda'
                ],
                where: {
                    active: true,
                    currentAffairId: currentAffairObj.currentAffairId
                }
            });
            if (currentAffair) {
                res = {
                    code: ServerResponseEnum.SUCCESS,
                    message: StringResource.SUCCESS,
                    data: currentAffair
                };
            } else {
                res = {
                    code: ServerResponseEnum.WARNING,
                    message: StringResource.NO_CURRENT_AFFAIR_FOUND,
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
}
