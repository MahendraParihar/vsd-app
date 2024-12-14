import { Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { FamilyModel, RelationshipModel } from '@server/common';

@Table({
  tableName: 'txn_family_relationship_mapping',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class FamilyRelationshipMappingModel extends Model<FamilyRelationshipMappingModel> {
  @Column({
    field: 'family_relationship_mapping_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  familyRelationshipMappingId: number;

  @ForeignKey(() => FamilyModel)
  @Column({
    field: 'parent_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'FamilyModel',
      key: 'family_id',
    },
  })
  parentId: number;

  @ForeignKey(() => FamilyModel)
  @Column({
    field: 'child_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'FamilyModel',
      key: 'family_id',
    },
  })
  childId: number;

  @ForeignKey(() => RelationshipModel)
  @Column({
    field: 'relationship_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'RelationshipModel',
      key: 'relationship_id',
    },
  })
  relationshipId: number;

  @Column({
    field: 'active',
    allowNull: false,
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  active: boolean;

  @CreatedAt
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    field: 'created_by',
    type: DataType.INTEGER,
  })
  createdBy: number;

  @UpdatedAt
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @Column({
    field: 'updated_by',
    type: DataType.INTEGER,
  })
  updatedBy: number;

  @Column({
    field: 'created_ip',
    allowNull: true,
    type: DataType.STRING(50),
  })
  createdIp: string;

  @Column({
    field: 'modified_ip',
    allowNull: true,
    type: DataType.STRING(50),
  })
  modifiedIp: string;
}
