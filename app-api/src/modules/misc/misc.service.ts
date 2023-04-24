import {Inject, Injectable} from '@nestjs/common';
import {MstMandal} from '../../core/database/models/mst-mandal.model';
import {TxnMandalMember} from '../../core/database/models/txn-mandal-member.model';
import {CommonService} from '../common/common.service';
import {IServerResponse} from '../../common-dto/response-interface';
import {ServerResponseEnum} from '../../enums/server-response-enum';
import {StringResource} from '../../enums/string-resource';
import {
    FAQ_CATEGORY_REPOSITORY,
    FAQ_REPOSITORY,
    INQUIRY_REPOSITORY,
    IS_DEV,
    LEGAL_PAGE_REPOSITORY,
    MANDAL_MEMBER_REPOSITORY,
    MANDAL_REPOSITORY,
    TEMPLE_REPOSITORY,
    TRUSTEE_REPOSITORY
} from '../../core/constants/config-constants';
import {TxnTrustee} from '../../core/database/models/txn-trustee.model';
import {MstTemple} from '../../core/database/models/mst-temple.model';
import {MstFaqCategory} from '../../core/database/models/mst-faq-category.model';
import {TxnLegalPages} from '../../core/database/models/txn-legal-pages.model';
import {TxnFaq} from '../../core/database/models/txn-faq.model';
import {TxnInquiry} from '../../core/database/models/txn-inquiry.model';
import {TableEnum} from '../../enums/table-enum';
import {TempleInterface} from '../../response-interface/temple.interface';
import {MandalInterface} from '../../response-interface/mandal.interface';

@Injectable()
export class MiscService {
    constructor(@Inject(MANDAL_REPOSITORY) private readonly mandalRepository: typeof MstMandal,
                @Inject(MANDAL_MEMBER_REPOSITORY) private readonly mandalMemberRepository: typeof TxnMandalMember,
                @Inject(TRUSTEE_REPOSITORY) private readonly trusteeRepository: typeof TxnTrustee,
                @Inject(TEMPLE_REPOSITORY) private readonly templeRepository: typeof MstTemple,
                @Inject(FAQ_CATEGORY_REPOSITORY) private readonly faqCategoryRepository: typeof MstFaqCategory,
                @Inject(FAQ_REPOSITORY) private readonly faqRepository: typeof TxnFaq,
                @Inject(LEGAL_PAGE_REPOSITORY) private readonly legalPageRepository: typeof TxnLegalPages,
                @Inject(INQUIRY_REPOSITORY) private readonly inquiryRepository: typeof TxnInquiry,
                private commonService: CommonService) {
    }

    public async findAllMandal(): Promise<IServerResponse> {
        let res: IServerResponse;
        try {
            const list = await this.mandalRepository.findAll<MstMandal>({
                attributes: ['mandalId', 'mandal', 'addressId'],
                where: {
                    active: true
                }
            });

            if (!list || list.length === 0) {
                res = {
                    code: ServerResponseEnum.WARNING,
                    message: StringResource.NO_MANDAL_FOUND,
                    data: null
                };
                return res;
            }

            const resList: MandalInterface[] = [];

            for (const s of list) {
                const iObj: MandalInterface = {
                    mandalId: s.mandalId,
                    mandal: s.mandal
                };
                iObj.address = await this.commonService.findAddress(TableEnum.MST_MANDAL, s.mandalId);
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

    public async findAllMandalMember(mandalId: number): Promise<IServerResponse> {
        let res: IServerResponse;
        try {
            const list = [];

            if (!list || list.length === 0) {
                res = {
                    code: ServerResponseEnum.WARNING,
                    message: StringResource.NO_MANDAL_MEMBER_FOUND,
                    data: null
                };
                return res;
            }

            res = {
                code: ServerResponseEnum.SUCCESS,
                message: StringResource.SUCCESS,
                data: list
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

    public async findAllTrustee(): Promise<IServerResponse> {
        let res: IServerResponse;
        try {
            const list = [];

            if (!list || list.length === 0) {
                res = {
                    code: ServerResponseEnum.WARNING,
                    message: StringResource.NO_TRUSTEE_FOUND,
                    data: null
                };
                return res;
            }

            res = {
                code: ServerResponseEnum.SUCCESS,
                message: StringResource.SUCCESS,
                data: list
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

    public async findAllTemple(): Promise<IServerResponse> {
        let res: IServerResponse;
        try {
            const list = await this.templeRepository.findAll<MstTemple>({
                where: {
                    active: true
                }
            });

            if (!list || list.length === 0) {
                res = {
                    code: ServerResponseEnum.WARNING,
                    message: StringResource.NO_TEMPLE_FOUND,
                    data: null
                };
                return res;
            }
            const resList: TempleInterface[] = [];

            for (const s of list) {
                const iObj: TempleInterface = {
                    templeId: s.templeId,
                    name: s.templeName,
                    imagePath: s.imagePath,
                };
                iObj.address = await this.commonService.findAddress(TableEnum.TXN_TEMPLE, s.templeId);
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

    public async findAllFAQs(): Promise<IServerResponse> {
        let res: IServerResponse;
        try {
            const list = await this.faqCategoryRepository.findAll<MstFaqCategory>({
                attributes: ['faqCategoryId', 'faqCategory'],
                where: {
                    active: true
                }
            });

            if (!list || list.length === 0) {
                res = {
                    code: ServerResponseEnum.WARNING,
                    message: StringResource.NO_FAQ_FOUND,
                    data: null
                };
                return res;
            }

            for (const temp of list) {
                temp['faqs'] = await this.faqRepository.findAll<TxnFaq>({
                    attributes: ['faq', 'faqAnswer'],
                    where: {
                        active: true,
                        faqCategoryId: temp.faqCategoryId
                    }
                })
            }

            res = {
                code: ServerResponseEnum.SUCCESS,
                message: StringResource.SUCCESS,
                data: list
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

    public async findLegalPage(legalPageIdIn: number): Promise<IServerResponse> {
        let res: IServerResponse;
        try {
            const legalPage = await this.legalPageRepository.findOne<TxnLegalPages>(
                {
                    attributes: ['legalPage', 'legalPageData'],
                    where: {
                        legalPageId: legalPageIdIn,
                        active: true
                    }
                }
            );

            if (!legalPage) {
                res = {
                    code: ServerResponseEnum.WARNING,
                    message: StringResource.NO_LEGAL_PAGE_FOUND,
                    data: null
                };
                return res;
            }

            res = {
                code: ServerResponseEnum.SUCCESS,
                message: StringResource.SUCCESS,
                data: legalPage
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

    public async addInquiry(inquiry: any): Promise<IServerResponse> {
        let res: IServerResponse;
        try {

            const inq = await this.inquiryRepository.create<TxnInquiry>(inquiry);

            if (!inq) {
                res = {
                    code: ServerResponseEnum.ERROR,
                    message: StringResource.SOMETHING_WENT_WRONG,
                    data: null
                };
                return res;
            }

            res = {
                code: ServerResponseEnum.SUCCESS,
                message: StringResource.SUCCESS,
                data: null
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
}
