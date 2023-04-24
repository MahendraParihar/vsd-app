import {BelongsTo, Column, DataType, Index, Model, Table} from 'sequelize-typescript';
import {TxnAppUser} from './txn-app-user.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_app_user_device',
  timestamps: true
})
export class TxnAppUserDevice extends Model<TxnAppUserDevice> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  appUserDeviceId: number;

  @Index('idx-app-device-app-user-id')
  @BelongsTo(() => TxnAppUser, {
    foreignKey: 'appUserId',
    targetKey: 'appUserId',
    as: 'appUserAppUserDevice'
  })
  @Column({
    allowNull: false,
  })
  appUserId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  deviceName: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  platform: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: true,
  })
  deviceId: string;

  @Column({
    allowNull: true,
  })
  pushToken: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  isLogin: boolean;

  @Column({
    allowNull: false,
  })
  appVersion: string;

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
    allowNull: false,
  })
  createdIp: string;

  @Column({
    allowNull: false,
  })
  modifiedIp: string;
}
