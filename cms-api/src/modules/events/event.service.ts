import {Inject, Injectable} from '@nestjs/common';
import {EventListInterface} from '../../response-interface/event-list.interface';
import {TxnEvent} from '../../core/database/models/txn-event.model';
import {
  ADMIN_USER_SHORT_INFO_ATTRIBUTE,
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATE_TIME_FORMAT,
  DEFAULT_TIME_FORMAT,
  DISPLAY_TIME_FORMAT,
  EVENT_COORDINATE_REPOSITORY,
  EVENT_INTEREST_MEMBER_REPOSITORY,
  EVENT_REPOSITORY,
  IS_DEV
} from '../../constants/config-constants';
import {TxnEventCoordinator} from '../../core/database/models/txn-event-coordinator.model';
import {TxnEventInterestedMember} from '../../core/database/models/txn-event-interested-member.model';
import {Sequelize} from 'sequelize-typescript';
import {CreateEventDto, EventSearchDto} from './dto/event.dto';
import {IServerResponse} from '../../common-dto/response-interface';
import {ServerResponseEnum} from '../../enums/server-response-enum';
import {StringResource} from '../../enums/string-resource';
import * as moment from 'moment';
import * as _ from 'lodash';
import {CommonService} from '../common/common.service';
import {GetDetailDto, UpdateActiveDto} from '../../common-dto/basic-input.dto';
import {MstAdminUser} from "../../core/database/models/mst-admin-user.model";
import {TableEnum} from "../../enums/table-enum";
import {AddressTypeEnum} from "../../enums/address-type-enum";
import {CommonFunctionsUtil} from "../../util/common-functions-util";

@Injectable()
export class EventService {

  constructor(@Inject(EVENT_REPOSITORY) private readonly eventRepository: typeof TxnEvent,
              @Inject(EVENT_COORDINATE_REPOSITORY) private readonly eventCoordiantorRepository: typeof TxnEventCoordinator,
              @Inject(EVENT_INTEREST_MEMBER_REPOSITORY) private readonly eventInterestedMemberRepository: typeof TxnEventInterestedMember,
              private sequelize: Sequelize,
              private commonService: CommonService) {
  }

  public async findAllEvent(searchDto: EventSearchDto): Promise<IServerResponse> {
    let res: IServerResponse;
    try {

      let whereCondition = {};
      const pageNumber = searchDto.pageNumber;
      const pageSize = searchDto.pageSize;
      let offset = pageNumber === 0 ? 0 : (pageNumber * pageSize);

      const fromDate = moment().format('YYYY-MM-DD');
      const toDate = moment().add(365, 'days').format('YYYY-MM-DD');

      /*whereCondition['date'] = {
        [Op.between]: [fromDate, toDate]
      };*/

      const totalCount = await this.eventRepository.count({
        where: whereCondition
      });

      const list = await this.eventRepository.findAll<TxnEvent>({
        include: [
          {
            model: MstAdminUser,
            required: false,
            as: 'CreatedBy',
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          },
          {
            model: MstAdminUser,
            required: false,
            as: 'ModifiedBy',
            attributes: ADMIN_USER_SHORT_INFO_ATTRIBUTE
          }
        ],
        attributes: ['eventId', 'title', 'date', 'time', 'imagePath', 'addressId', 'visitedCount', 'urlPath','isPublished', 'noOfDays', 'active', 'createdAt', 'updatedAt', 'createdBy', 'modifiedBy'],
        where: whereCondition,
        order: [
          ['date', 'ASC'],
          ['time', 'ASC'],
        ],
        offset: offset,
        limit: pageSize
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
          imagePath: CommonFunctionsUtil.getImagesObj(s.imagePath),
          date: moment(s.date),
          time: moment(s.time, DEFAULT_TIME_FORMAT),
          urlPath: s.urlPath,
          visitedCount: s.visitedCount,
          isPublished: s.isPublished,
          active: s.active,
          createdBy: CommonFunctionsUtil.getAdminShortInfo(s['CreatedBy'], 'CreatedBy'),
          updatedBy: CommonFunctionsUtil.getAdminShortInfo(s['ModifiedBy'], 'ModifiedBy'),
          createdAt: moment(s.createdAt),
          updatedAt: moment(s.updatedAt)
        };
        resList.push(iObj);
      }

      res = {
        code: ServerResponseEnum.SUCCESS,
        message: StringResource.SUCCESS,
        data: {
          list: resList,
          count: totalCount
        }
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

  public async fetchEventDetailById(event: GetDetailDto): Promise<IServerResponse> {

    let res: IServerResponse;
    try {
      const eventObj = await this.eventRepository.findOne<TxnEvent>({
        attributes: [
          'eventId', 'title', 'date', 'time', 'imagePath', 'description',
          'visitedCount', 'urlPath', 'noOfDays','isPublished',
          'downloadPath', 'agenda'
        ],
        where: {
          eventId: event.id
        },
        raw: true
      });
      if (eventObj) {
        const obj = {
          ...eventObj,
          address: await this.commonService.findAddress(TableEnum.TXN_EVENT, event.id),
          coordinators: await this.findEventCoordinators(event.id)
        }
        res = {
          code: ServerResponseEnum.SUCCESS,
          message: StringResource.SUCCESS,
          data: obj
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

  public async createEvent(obj: CreateEventDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;

    const t = await this.sequelize.transaction();

    try {
      // create event
      const insertedData = await this.createData({
        title: obj.title,
        description: obj.description,
        date: obj.date,
        time: obj.time,
        visitedCount: 0,
        noOfDays: obj.agenda.length,
        imagePath: (obj.uploadFiles && obj.uploadFiles.length > 0) ? obj.uploadFiles : null,
        urlPath: CommonFunctionsUtil.removeSpecialChar(obj.title),
        agenda: obj.agenda,
        createdIp: ip,
        modifiedIp: ip,
        createdBy: adminId,
        modifiedBy: adminId,
      });

      // add event coordinator
      await this.createEventCoordinatorData(insertedData['eventId'], obj.coordinator, adminId, ip);

      // add address
      await this.commonService.addAddress({
        tableId: TableEnum.TXN_EVENT,
        pkOfTable: insertedData['eventId'],
        addressTypeId: AddressTypeEnum.COMMUNICATION_ADDRESS,
        address: obj.address.address,
        pinCode: obj.address.pinCode,
        cityVillageId: obj.address.cityVillageId,
        districtId: obj.address.districtId,
        stateId: obj.address.stateId,
        countryId: obj.address.countryId,
        latitude: obj.address.latitude,
        longitude: obj.address.longitude,
        createdIp: ip,
        modifiedIp: ip
      });

      await t.commit();

      res = {
        code: ServerResponseEnum.SUCCESS,
        message: StringResource.SUCCESS,
        data: null
      };

      return res;
    } catch (e) {
      await t.rollback();
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async updateEvent(id: number, obj: CreateEventDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;

    const t = await this.sequelize.transaction();
    try {
      // update event
      await this.updateData(id, {
        title: obj.title,
        description: obj.description,
        date: obj.date,
        time: obj.time,
        noOfDays: obj.agenda.length,
        imagePath: (obj.uploadFiles && obj.uploadFiles.length > 0) ? obj.uploadFiles : null,
        agenda: obj.agenda,
        modifiedIp: ip,
        modifiedBy: adminId
      });

      // update coordinator
      await this.createEventCoordinatorData(id, obj.coordinator, adminId, ip);

      // update address
      await this.commonService.updateAddressByTableNPkOfTable(TableEnum.TXN_EVENT, id, {
        tableId: TableEnum.TXN_EVENT,
        pkOfTable: id,
        addressTypeId: AddressTypeEnum.COMMUNICATION_ADDRESS,
        address: obj.address.address,
        pinCode: obj.address.pinCode,
        cityVillageId: obj.address.cityVillageId,
        districtId: obj.address.districtId,
        stateId: obj.address.stateId,
        countryId: obj.address.countryId,
        latitude: obj.address.latitude,
        longitude: obj.address.longitude,
        modifiedIp: ip
      });

      await t.commit();

      res = {
        code: ServerResponseEnum.SUCCESS,
        message: StringResource.SUCCESS,
        data: null
      };
      return res;
    } catch (e) {
      await t.rollback();
      res = {
        code: ServerResponseEnum.ERROR,
        message: IS_DEV ? e['message'] : StringResource.SOMETHING_WENT_WRONG,
        data: null
      };
      return res;
    }
  }

  public async updateEventPublishStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.eventRepository.update(
        {
          isPublished: obj.active,
          modifiedBy: adminId,
          modifiedIp: ip
        },
        {
          where: {
            eventId: obj.id
          }
        }
      );
      if (queryRes) {
        res = {
          code: ServerResponseEnum.SUCCESS,
          message: StringResource.SUCCESS,
          data: null
        };
      } else {
        res = {
          code: ServerResponseEnum.ERROR,
          message: StringResource.SOMETHING_WENT_WRONG,
          data: null
        }
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

  public async updateEventStatus(obj: UpdateActiveDto, ip: string, adminId: number): Promise<IServerResponse> {
    let res: IServerResponse;
    try {
      const queryRes = await this.eventRepository.update(
        {
          active: obj.active,
          modifiedBy: adminId,
          modifiedIp: ip
        },
        {
          where: {
            eventId: obj.id
          }
        }
      );
      if (queryRes) {
        res = {
          code: ServerResponseEnum.SUCCESS,
          message: StringResource.SUCCESS,
          data: null
        };
      } else {
        res = {
          code: ServerResponseEnum.ERROR,
          message: StringResource.SOMETHING_WENT_WRONG,
          data: null
        }
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

  private async createData(obj: any) {
    return await this.eventRepository.create(obj);
  }

  private async updateData(id: number, obj: any) {
    return await this.eventRepository.update(obj, {where: {eventId: id}});
  }

  private async createEventCoordinatorData(eventId: number, coordinators, adminId, ip) {

    const familyIds = coordinators.split(',');
    const eventCoordinatorArray = [];
    for (const f of familyIds) {
      eventCoordinatorArray.push({
        familyId: f,
        eventId: eventId,
        post: null,
        createdBy: adminId,
        modifiedBy: adminId,
        createdIp: ip,
        modifiedIp: ip
      });
    }

    await this.eventCoordiantorRepository.destroy({
      where: {
        eventId: eventId
      }
    });
    return await this.eventCoordiantorRepository.bulkCreate(eventCoordinatorArray);
  }

  private async findEventCoordinators(eventId): Promise<any[]> {
    const eventCoordinator = await this.eventCoordiantorRepository.findAll({
      attributes: ['familyId'],
      where: {
        eventId: eventId
      },
      raw: true
    });
    return await this.commonService.getSelectedUserList(_.map(eventCoordinator, 'familyId'));
  }
}
