import {BelongsTo, Column, DataType, Index, Model, Table} from 'sequelize-typescript';
import {AppUserStatusEnum} from '../../../enums/app-user-status';
import {MstAdminRole} from './mst-admin-role.model';
import {MstCityVillage} from "./mst-city-village.model";

@Table({
  modelName: 'mst_admin_user',
  timestamps: true,
})
export class MstAdminUser extends Model<MstAdminUser> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  adminId: number;

  @BelongsTo(() => MstAdminRole, {
    foreignKey: 'roleId',
    targetKey: 'roleId',
    as: 'AdminUserRole',
  })
  @Column({
    allowNull: false,
  })
  roleId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  imagePath: string;

  @Index('idx-admin-user-email-id')
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  emailId: string;

  @Index('idx-admin-user-contact-number')
  @Column({
    type: DataType.STRING(16),
    allowNull: false,
    unique: true,
  })
  contactNo: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  password: string;

  @Column({
    allowNull: true,
  })
  cityVillageId?: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  startDate: Date;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  endDate: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  verificationCode: string;

  @Column({
    defaultValue: AppUserStatusEnum.PENDING_FOR_OTP_VARIFICATION,
  })
  adminUserStatusId: number;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
  })
  deactiveReason: string;

  @Column({
    allowNull: true,
    defaultValue: null,
  })
  createdBy: number;

  @Column({
    allowNull: true,
    defaultValue: null,
  })
  modifiedBy: number;

  @Column({
    allowNull: false,
  })
  createdIp: string;

  @Column({
    allowNull: false,
  })
  modifiedIp: string;
}
