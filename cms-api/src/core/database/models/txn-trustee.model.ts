import {BelongsTo, Column, DataType, Index, Model, Table} from 'sequelize-typescript';
import {TxnFamily} from './txn-family.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_trustee',
  timestamps: true
})
export class TxnTrustee extends Model<TxnTrustee> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  trusteeId: number;

  @Index('idx-trustee-family-id')
  @BelongsTo(() => TxnFamily, {
    foreignKey: 'familyId',
    targetKey: 'familyId',
    as: 'TrusteeFamily'
  })
  @Column({
    allowNull: false,
  })
  familyId: number;

  @Column({
    allowNull: false,
  })
  fromYear: number;

  @Column({
    allowNull: true,
    defaultValue: null
  })
  toYear: number;

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
