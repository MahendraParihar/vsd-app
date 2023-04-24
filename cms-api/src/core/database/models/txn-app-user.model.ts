import {BelongsTo, Column, DataType, Index, Model, Table} from 'sequelize-typescript';
import {AppUserStatusEnum} from '../../../enums/app-user-status';
import {MstCityVillage} from './mst-city-village.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_app_user',
  timestamps: true
})
export class TxnAppUser extends Model<TxnAppUser> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  appUserId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  lastName: string;

  @Index('idx-app-user-email-id')
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  emailId: string;

  @Index('idx-app-user-contact-number')
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  contactNo: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.STRING(6),
    allowNull: true,
  })
  verificationCode: string;

  @BelongsTo(() => MstCityVillage, {
    foreignKey: 'cityVillageId',
    targetKey: 'cityVillageId',
    as: 'AppUserCityVillage'
  })
  @Column({
    allowNull: false,
  })
  cityVillageId: number;

  @Column({
    defaultValue: AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION
  })
  appUserStatusId: number;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
  })
  deactiveReason: string;

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

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  createdIp: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  modifiedIp: string;
}
