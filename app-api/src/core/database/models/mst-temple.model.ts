import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
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
    type: DataType.STRING(100),
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
    as: 'TempleCreatedBy'
  }) @Column({allowNull: false}) createdBy: number;
  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'TempleModifiedBy'
  }) @Column({allowNull: false}) modifiedBy: number;
}
