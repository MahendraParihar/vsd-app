import { BelongsTo, Column, CreatedAt, DataType, Model, Scopes, Table, UpdatedAt } from 'sequelize-typescript';
import { AdminUserModel } from '@server/common';

@Table({
  tableName: 'txn_inquiry',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
@Scopes(() => ({
  list: {
    include: [
      {
        attributes: ['adminUserId', 'firstName', 'lastName'],
        model: AdminUserModel,
        required: true,
        as: 'createdByUser',
      },
      {
        attributes: ['adminUserId', 'firstName', 'lastName'],
        model: AdminUserModel,
        required: true,
        as: 'updatedByUser',
      },
    ],
  },
}))
export class InquiryModel extends Model<InquiryModel> {
  @Column({
    field: 'inquiry_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  inquiryId: number;

  @Column({
    field: 'name',
    allowNull: false,
    type: DataType.STRING(50),
  })
  name: string;

  @Column({
    field: 'email_id',
    allowNull: false,
    type: DataType.STRING(100),
  })
  emailId: string;

  @Column({
    field: 'contact_number',
    allowNull: false,
    type: DataType.STRING(16),
  })
  contactNumber: string;

  @Column({
    field: 'message',
    allowNull: false,
    type: DataType.TEXT,
  })
  message: string;

  @Column({
    field: 'recaptcha',
    allowNull: false,
    defaultValue: null,
    type: DataType.TEXT,
  })
  recaptcha: string;

  @Column({
    field: 'is_responded',
    allowNull: false,
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  isResponded: boolean;

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

  @BelongsTo(() => AdminUserModel, { as: 'createdByUser', foreignKey: 'createdBy', targetKey: 'adminUserId' })
  createdByUser: AdminUserModel;

  @BelongsTo(() => AdminUserModel, { as: 'updatedByUser', foreignKey: 'updatedBy', targetKey: 'adminUserId' })
  updatedByUser: AdminUserModel;
}
