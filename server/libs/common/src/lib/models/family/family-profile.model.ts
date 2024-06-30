import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { AdminUserModel } from '@server/common';

@Table({
  tableName: 'txn_family_profile',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class FamilyProfileModel extends Model<FamilyProfileModel> {
  @Column({
    field: 'family_profile_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  familyProfileId: number;

  @Column({
    field: 'family_id',
    allowNull: false,
    type: DataType.NUMBER,
  })
  familyId: number;

  @Column({
    field: 'gender_id',
    allowNull: false,
    type: DataType.NUMBER,
  })
  genderId: number;

  @Column({
    field: 'marital_status_id',
    allowNull: false,
    type: DataType.NUMBER,
  })
  maritalStatusId: number;

  @Column({
    field: 'religion_id',
    allowNull: true,
    type: DataType.NUMBER,
  })
  religionId: number;

  @Column({
    field: 'caste_id',
    allowNull: true,
    type: DataType.NUMBER,
  })
  casteId: number;

  @Column({
    field: 'gotra_id',
    allowNull: true,
    type: DataType.NUMBER,
  })
  gotraId: number;

  @Column({
    field: 'raasi_id',
    allowNull: true,
    type: DataType.NUMBER,
  })
  raasiId: number;

  @Column({
    field: 'is_maglik',
    allowNull: false,
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isMaglik: boolean;

  @Column({
    field: 'date_of_birth',
    allowNull: true,
    type: DataType.DATEONLY,
  })
  dateOfBirth: Date;

  @Column({
    field: 'description',
    allowNull: true,
    type: DataType.STRING(500),
  })
  description: string;

  @Column({
    field: 'hobbies',
    allowNull: true,
    type: DataType.STRING(500),
  })
  hobbies: string;

  @Column({
    field: 'monthly_income',
    allowNull: true,
    type: DataType.DECIMAL,
  })
  monthlyIncome: number;

  @Column({
    field: 'height',
    allowNull: false,
    type: DataType.DECIMAL,
  })
  height: number;

  @BelongsTo(() => AdminUserModel, { as: 'createdByUser', foreignKey: 'createdBy', targetKey: 'adminUserId' })
  createdByUser: AdminUserModel;

  @BelongsTo(() => AdminUserModel, { as: 'updatedByUser', foreignKey: 'modifiedBy', targetKey: 'adminUserId' })
  updatedByUser: AdminUserModel;
}
