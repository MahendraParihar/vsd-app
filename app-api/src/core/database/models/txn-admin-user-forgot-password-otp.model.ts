import {BelongsTo, Column, CreatedAt, DataType, Index, Model, Table} from 'sequelize-typescript';
import {MstAdminUser} from './mst-admin-user.model';


@Table({
  modelName: 'txn_admin_user_forgot_password_otp',
  timestamps: true
})
export class TxnAdminUserForgotPasswordOtp extends Model<TxnAdminUserForgotPasswordOtp> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  forgotPasswordOtpId: number;

  @Index('idx-admin-forgot-password-admin-id')
  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'adminId',
    targetKey: 'adminId',
    as: 'adminUserAdmin'
  })
  @Column({
    allowNull: false,
  })
  adminId: number;

  @Column({
    type: DataType.STRING(6),
    allowNull: false,
  })
  otp: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true
  })
  active: boolean;
}
