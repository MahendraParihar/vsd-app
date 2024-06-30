import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { AddressModel, AdminUserModel } from '@server/common';

@Table({
  tableName: 'mst_mandal',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class MandalModel extends Model<MandalModel> {
  @Column({
    field: 'mandal_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  mandalId: number;

  @Column({
    field: 'mandal_name',
    allowNull: false,
    type: DataType.STRING(150),
  })
  mandalName: string;

  @ForeignKey(() => AddressModel)
  @Column({
    field: 'address_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'AddressModel',
      key: 'address_id',
    },
  })
  addressId: number;

  @Column({
    field: 'image_path',
    allowNull: false,
    type: DataType.JSONB,
  })
  imagePath: object;

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

  @BelongsTo(() => AdminUserModel, { as: 'createdByUser', foreignKey: 'createdBy', targetKey: 'adminUserId' })
  createdByUser: AdminUserModel;

  @BelongsTo(() => AdminUserModel, { as: 'updatedByUser', foreignKey: 'modifiedBy', targetKey: 'adminUserId' })
  updatedByUser: AdminUserModel;

  @BelongsTo(() => AddressModel, { as: 'address', foreignKey: 'addressId', targetKey: 'addressId' })
  address: AddressModel;
}
