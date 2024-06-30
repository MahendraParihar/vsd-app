import { Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { EducationDegreeModel, FamilyModel } from '@server/common';

@Table({
  tableName: 'txn_family_education',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class FamilyEducationModel extends Model<FamilyEducationModel> {
  @Column({
    field: 'education_mapping_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  educationMappingId: number;

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

  @ForeignKey(() => EducationDegreeModel)
  @Column({
    field: 'education_degree_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'EducationDegreeModel',
      key: 'education_degree_id',
    },
  })
  educationDegreeId: number;

  @Column({
    field: 'unit',
    allowNull: false,
    type: DataType.STRING(10),
  })
  unit: string;

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
