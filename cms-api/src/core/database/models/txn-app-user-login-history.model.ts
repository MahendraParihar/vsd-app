import {BelongsTo, Column, DataType, Index, Model, Table} from 'sequelize-typescript';
import {TxnAppUserDevice} from './txn-app-user-device.model';

@Table({
  modelName: 'txn_app_user_login_history',
  timestamps: true
})
export class TxnAppUserLoginHistory extends Model<TxnAppUserLoginHistory> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  appUserLoginHistoryId: number;

  @Index('idx-login-history-app-user-device-id')
  @BelongsTo(() => TxnAppUserDevice, {
    foreignKey: 'appUserDeviceId',
    targetKey: 'appUserDeviceId',
    as: 'appUserDeviceHistory'
  })
  @Column({
    allowNull: false,
  })
  appUserDeviceId: number;

  @Column({
    allowNull: false,
  })
  createdIp: string;
}
