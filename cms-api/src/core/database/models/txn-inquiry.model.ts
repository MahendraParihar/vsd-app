import {BelongsTo, Column, DataType, Model, Table} from 'sequelize-typescript';
import {TxnAppUser} from './txn-app-user.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_inquiry',
  timestamps: true
})
export class TxnInquiry extends Model<TxnInquiry> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  inquiryId: number;

  @BelongsTo(() => TxnAppUser, {
    foreignKey: 'appUserId',
    targetKey: 'appUserId',
    as: 'InquiryAppUser'
  })
  @Column({
    allowNull: true,
  })
  appUserId: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  emailId: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  contactNumber: string;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
  })
  message: string;

  @Column({
    allowNull: false,
    defaultValue: false
  })
  isResponded: boolean;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
  })
  responseText: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'CreatedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'ModifiedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  modifiedBy: number;
}
