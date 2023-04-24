import {BelongsTo, Column, CreatedAt, DataType, Index, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {TxnFamily} from './txn-family.model';
import {TxnFamilyBusiness} from './txn-family-business.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_family_business_mapping',
  timestamps: true
})
export class TxnFamilyBusinessMapping extends Model<TxnFamilyBusinessMapping> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  familyBusinessMappingId: number;

  @Index('idx-family-business-family-id')
  @BelongsTo(() => TxnFamily, {
    foreignKey: 'familyId',
    targetKey: 'familyId',
    as: 'FamilyBusinessFamily'
  })
  @Column({
    allowNull: false,
  })
  familyId: number;

  @BelongsTo(() => TxnFamilyBusiness, {
    foreignKey: 'familyBusinessId',
    targetKey: 'familyBusinessId',
    as: 'FamilyBusinessMapping'
  })
  @Column({
    allowNull: false,
  })
  familyBusinessId: number;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'FamilyBusinessMappingCreatedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'FamilyBusinessMappingModifiedBy'
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
