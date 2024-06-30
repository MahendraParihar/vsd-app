import { Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { AdminUserModel, FamilyModel, MatrimonialStatusModel } from '@server/common';

@Table({
  tableName: 'txn_matrimonial_profile',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class MatrimonialProfileModel extends Model<MatrimonialProfileModel> {
  @Column({
    field: 'matrimonial_profile_id',
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

  @ForeignKey(() => MatrimonialStatusModel)
  @Column({
    field: 'matrimonial_status_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'MatrimonialStatusModel',
      key: 'matrimonial_status_id',
    },
  })
  matrimonialStatusId: number;

  @Column({
    field: 'status_change_reason',
    allowNull: false,
    type: DataType.STRING(250),
  })
  statusChangeReason: string;

  @ForeignKey(() => AdminUserModel)
  @Column({
    field: 'status_change_by',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'AdminModel',
      key: 'admin_id',
    },
  })
  statusChangeBy: number;

  @CreatedAt
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

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
