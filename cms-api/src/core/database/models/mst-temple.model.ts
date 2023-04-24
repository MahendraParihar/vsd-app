import {BelongsTo, Column, DataType, Model, Table} from 'sequelize-typescript';
import {TxnAddress} from './txn-address.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_temple',
  timestamps: true
})
export class MstTemple extends Model<MstTemple> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  templeId: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  templeName: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  imagePath: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @BelongsTo(() => TxnAddress, {
    foreignKey: 'addressId',
    targetKey: 'addressId',
    as: 'TempleAddressId'
  })
  @Column({
    allowNull: true,
    defaultValue: null
  })
  addressId: number;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  createdIp: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  modifiedIp: string;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'CreatedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  }) createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'ModifiedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  }) modifiedBy: number;
}
