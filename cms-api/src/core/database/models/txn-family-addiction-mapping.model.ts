import {BelongsTo, Column, DataType, Index, Model, Table} from 'sequelize-typescript';
import {TxnFamily} from './txn-family.model';
import {MstAddiction} from './mst-addiction.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_family_addiction_mapping',
  timestamps: true
})
export class TxnFamilyAddictionMapping extends Model<TxnFamilyAddictionMapping> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  familyAddictionId: number;

  @Index('idx-family-addiction-family-id')
  @BelongsTo(() => TxnFamily, {
    foreignKey: 'familyId',
    targetKey: 'familyId',
    as: 'FamilyAddictionFamily'
  })
  @Column({
    allowNull: false,
  })
  familyId: number;

  @BelongsTo(() => MstAddiction, {
    foreignKey: 'addictionId',
    targetKey: 'addictionId',
    as: 'FamilyAddiction'
  })
  @Column({
    allowNull: false,
  })
  addictionId: number;

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

  @Column({
    allowNull: false,
  })
  createdIp: string;

  @Column({
    allowNull: false,
  })
  modifiedIp: string;
}
