import {BelongsTo, Column, CreatedAt, DataType, Index, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {TxnFamily} from './txn-family.model';
import {MstRelation} from './mst-relation.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_family_relationship_mapping',
  timestamps: true
})
export class TxnFamilyRelationshipMapping extends Model<TxnFamilyRelationshipMapping> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  familyRelationshipMappingId: number;

  @Index('idx-family-relation-parent-id')
  @BelongsTo(() => TxnFamily, {
    foreignKey: 'familyId',
    targetKey: 'familyId',
    as: 'FamilyRelationshipParentFamily'
  })
  @Column({
    allowNull: false,
  })
  parentId: number;

  @BelongsTo(() => TxnFamily, {
    foreignKey: 'familyId',
    targetKey: 'familyId',
    as: 'FamilyRelationshipChildFamily'
  })
  @Column({
    allowNull: false,
  })
  childId: number;

  @BelongsTo(() => MstRelation, {
    foreignKey: 'relationId',
    targetKey: 'relationId',
    as: 'FamilyRelation'
  })
  @Column({
    allowNull: false,
  })
  relationId: number;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'FamilyRelationMappingCreatedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'FamilyRelationMappingModifiedBy'
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
