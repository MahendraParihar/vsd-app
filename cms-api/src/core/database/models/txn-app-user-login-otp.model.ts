import {BelongsTo, Column, DataType, Model, Table} from 'sequelize-typescript';
import {TxnAppUser} from './txn-app-user.model';

@Table({
  modelName: 'txn_app_user_login_otp',
  timestamps: true
})
export class TxnAppUserLoginOtp extends Model<TxnAppUserLoginOtp> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  appUserLoginOtpId: number;

  @BelongsTo(() => TxnAppUser, {
    foreignKey: 'appUserId',
    targetKey: 'appUserId',
    as: 'LoginOtpAppUser'
  })
  @Column({
    allowNull: false
  })
  appUserId: number;

  @Column({
    type: DataType.STRING(6),
    allowNull: true
  })
  verificationCode: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  createdIp: string;
}
