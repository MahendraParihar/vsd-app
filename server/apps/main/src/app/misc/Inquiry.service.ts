import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IBaseAdminUser, IInquiry, IInquiryList, IStatusChange, ITableList, ITableListFilter } from '@vsd-common/lib';
import { Op } from 'sequelize';
import { InquiryModel } from './models/inquiry.model';

@Injectable()
export class InquiryService {
  constructor(@InjectModel(InquiryModel) private inquiryModel: typeof InquiryModel) {
  }

  async load(payload: ITableListFilter): Promise<ITableList<IInquiryList>> {
    const where = {};
    if (payload.search) {
      payload.search = payload.search.toLowerCase();
      Object.assign(where, {
        [Op.or]: [
          { name: { [Op.iLike]: `%${payload.search}%` } },
        ],
      });
    }
    const { rows, count } = await this.inquiryModel.scope('list').findAndCountAll({
      where: where,
      limit: payload.limit,
      offset: payload.limit * payload.page,
      order: [['name', 'asc']],
    });
    const data = rows.map((data: InquiryModel) => {
      return this.formatInquiries(data);
    });
    return <ITableList<IInquiryList>>{
      data: data,
      count: count,
    };
  }

  async manage(obj: IInquiry, userId: number, ipAddress: string): Promise<InquiryModel> {
    const dataObj = {
      name: obj.name,
      emailId: obj.emailId,
      contactNumber: obj.contactNumber,
      message: obj.message,
      updatedBy: userId,
      modifiedIp: ipAddress,
      recaptcha: obj.recaptcha,
    };
    Object.assign(dataObj, { createdBy: userId });
    Object.assign(dataObj, { createdIp: ipAddress });
    console.log(dataObj);
    return await this.inquiryModel.create(dataObj) as InquiryModel;
  }

  async updateStatus(id: number, body: IStatusChange, userId: number) {
    const obj = await this.inquiryModel.findOne({ where: { inquiryId: id } });
    obj.active = body.status;
    obj.updatedBy = userId;
    await obj.save();
  }

  private formatInquiries(data: InquiryModel): IInquiryList {
    return <IInquiryList>{
      inquiryId: data.inquiryId,
      name: data.name,
      contactNumber: data.contactNumber,
      emailId: data.emailId,
      isResponded: data.isResponded,
      message: data.message,
      active: data.active,
      createdAt: data.createdAt,
      createdBy: data.createdBy,
      createdIp: data.createdIp,
      modifiedIp: data.modifiedIp,
      updatedAt: data.updatedAt,
      updatedBy: data.updatedBy,
      createdByUser: <IBaseAdminUser>{
        firstName: data.createdByUser.firstName,
        lastName: data.createdByUser.lastName,
      },
      updatedByUser: <IBaseAdminUser>{
        firstName: data.updatedByUser.firstName,
        lastName: data.updatedByUser.lastName,
      },
    };
  }
}
