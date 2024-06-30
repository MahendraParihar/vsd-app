import { Column, DataType, Table, Model, UpdatedAt, CreatedAt, ForeignKey } from 'sequelize-typescript';
import { AddictionModel, AddressModel, AdminUserModel, BusinessModel, FamilyModel } from '@server/common';

@Table({
  tableName: 'txn_family_business',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class FamilyBusinessModel extends Model<FamilyBusinessModel> {
  @Column({
    field: 'family_business_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  familyBusinessId: number;

  @ForeignKey(() => BusinessModel)
  @Column({
    field: 'business_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'BusinessModel',
      key: 'business_id',
    },
  })
  businessId: number;

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
  AddressModel: number;

  @Column({
    field: 'website_link',
    allowNull: true,
    type: DataType.STRING(250),
  })
  websiteLink: string;

  @Column({
    field: 'contact_number',
    allowNull: true,
    type: DataType.STRING(50),
  })
  contactNumber: string;

  @Column({
    field: 'email_id',
    allowNull: true,
    type: DataType.STRING(250),
  })
  emailId: string;

  @Column({
    field: 'image_path',
    allowNull: true,
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
}
