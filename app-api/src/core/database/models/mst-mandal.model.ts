import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {TxnAddress} from './txn-address.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_mandal',
  timestamps: true
})
export class MstMandal extends Model<MstMandal> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  mandalId: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  mandal: string;

  @BelongsTo(() => TxnAddress, {
    foreignKey: 'addressId',
    targetKey: 'addressId',
    as: 'MandalAddressId'
  })
  @Column({
    allowNull: true,
  })
  addressId: number;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'MandalCreatedBy'
  }) @Column({allowNull: false}) createdBy: number;
  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'MandalModifiedBy'
  }) @Column({allowNull: false}) modifiedBy: number;
}
