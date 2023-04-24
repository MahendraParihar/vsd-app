import {BelongsTo, Column, CreatedAt, DataType, Index, Model, Table} from 'sequelize-typescript';
import {MstAdminUser} from './mst-admin-user.model';


@Table({
  modelName: 'txn_admin_user_login_history',
  timestamps: true
})
export class TxnAdminUserLoginHistory extends Model<TxnAdminUserLoginHistory> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  adminUserLoginHistoryId: number;

  @Index('idx-login-history-admin-user-device-id')
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
    allowNull: false,
  })
  createdIp: string;
}
