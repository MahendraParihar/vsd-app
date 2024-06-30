import { Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { FamilyModel } from '@server/common';
import { FamilyBusinessModel } from './family-business.model';

@Table({
  tableName: 'txn_family_business_mapping',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class FamilyBusinessMappingModel extends Model<FamilyBusinessMappingModel> {
  @Column({
    field: 'family_business_mapping_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  familyBusinessMappingId: number;

  @ForeignKey(() => FamilyBusinessModel)
  @Column({
    field: 'family_business_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'FamilyBusinessModel',
      key: 'family_business_id',
    },
  })
  familyBusinessId: number;

  @ForeignKey(() => FamilyModel)
  @Column({
    field: 'family_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'FamilyModel',
      key: 'family_id',
    },
  })
  familyId: number;

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
    field: 'modified_by',
    type: DataType.INTEGER,
  })
  modifiedBy: number;

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
