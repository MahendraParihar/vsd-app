import { Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { UserStatusModel } from './user-status.model';
import { AddressModel } from '../location';

@Table({
  tableName: 'mst_admin_user',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class AdminUserModel extends Model<AdminUserModel> {
  @Column({
    field: 'admin_user_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  adminUserId: number;

  @Column({
    field: 'first_name',
    allowNull: false,
    type: DataType.STRING(50),
  })
  firstName: string;

  @Column({
    field: 'last_name',
    allowNull: false,
    type: DataType.STRING(50),
  })
  lastName: string;

  @Column({
    field: 'profile_picture',
    allowNull: false,
    type: DataType.JSONB,
  })
  profilePicture: object;

  @Column({
    field: 'password',
    allowNull: false,
    type: DataType.TEXT,
  })
  password: string;

  @Column({
    field: 'password_temp',
    allowNull: false,
    type: DataType.TEXT,
  })
  passwordTemp: string;

  @Column({
    field: 'country_code',
    allowNull: false,
    type: DataType.STRING(5),
  })
  countryCode: string;

  @Column({
    field: 'contact_number',
    allowNull: false,
    type: DataType.STRING(16),
  })
  contactNumber: string;

  @Column({
    field: 'email_id',
    allowNull: false,
    type: DataType.STRING(100),
  })
  emailId: string;

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
    field: 'start_date',
    allowNull: false,
    type: DataType.DATE,
  })
  startDate: Date;

  @Column({
    field: 'end_date',
    allowNull: true,
    type: DataType.DATE,
  })
  endDate: Date;

  @ForeignKey(() => UserStatusModel)
  @Column({
    field: 'admin_user_status_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'UserStatusModel',
      key: 'admin_user_status_id',
    },
  })
  adminUserStatusId: number;

  @Column({
    field: 'deactivation_reason',
    allowNull: true,
    type: DataType.STRING(1000),
  })
  deactivationReason: string;

  @Column({
    field: 'verification_code',
    allowNull: true,
    type: DataType.TEXT,
  })
  verificationCode: string;

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

  // @BelongsTo(() => AddressModel, { targetKey: 'addressId', foreignKey: 'addressId' })
  // address: AddressModel;

  // @BelongsTo(() => UserStatusModel)
  // adminUserStatus: UserStatusModel;
}
