import { Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { AddressModel, FamilyModel } from '@server/common';

@Table({
  tableName: 'txn_trustee',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class TrusteeModel extends Model<TrusteeModel> {
  @Column({
    field: 'trustee_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  trusteeId: number;

  @Column({
    field: 'mandal_name',
    allowNull: false,
    type: DataType.STRING(150),
  })
  mandalName: number;

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
    field: 'from_year',
    allowNull: false,
    type: DataType.DATEONLY,
  })
  fromYear: Date;

  @Column({
    field: 'to_year',
    allowNull: true,
    type: DataType.DATEONLY,
  })
  toYear: Date;

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
