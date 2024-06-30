import { Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { FamilyModel, ServiceModel } from '@server/common';

@Table({
  tableName: 'txn_family_service_mapping',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class FamilyServiceMappingModel extends Model<FamilyServiceMappingModel> {
  @Column({
    field: 'family_service_mapping_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  familyServiceMappingId: number;

  @ForeignKey(() => ServiceModel)
  @Column({
    field: 'service_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'ServiceModel',
      key: 'service_id',
    },
  })
  serviceId: number;

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
    field: 'job_profile',
    allowNull: false,
    type: DataType.STRING(500),
  })
  jobProfile: string;

  @Column({
    field: 'company_name',
    allowNull: false,
    type: DataType.STRING(200),
  })
  companyName: string;

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
