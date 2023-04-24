import {BelongsTo, Column, DataType, Index, Model, Table} from 'sequelize-typescript';
import {MstCityVillage} from './mst-city-village.model';
import {TxnAppUser} from './txn-app-user.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_family',
  timestamps: true
})
export class TxnFamily extends Model<TxnFamily> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  familyId: number;

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
    type: DataType.STRING(50),
    allowNull: false,
  })
  middleName: string;

  @BelongsTo(() => TxnAppUser, {
    foreignKey: 'appUserId',
    targetKey: 'appUserId',
    as: 'FamilyAppUser'
  })
  @Column({
    allowNull: true,
  })
  appUserId: number;

  @Index('idx-family-email-id')
  @Column({
    type: DataType.STRING(100),
    allowNull: true,
    unique: true,
  })
  emailId: string;

  @Index('idx-family-contact-number-id')
  @Column({
    type: DataType.STRING(16),
    allowNull: true,
    unique: true,
  })
  contactNo: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  imagePath: string;

  @BelongsTo(() => MstCityVillage, {
    foreignKey: 'cityVillageId',
    targetKey: 'cityVillageId',
    as: 'AppUserCityVillage'
  })
  @Column({
    allowNull: false,
  })
  cityVillageId: number;

  @Column({
    allowNull: false,
    defaultValue: 0
  })
  visitedCount: number;

  @Column({
    allowNull: false,
    defaultValue: false
  })
  isApproved: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'approvedBy',
    targetKey: 'adminId',
    as: 'ApprovedBy'
  })
  @Column({
    allowNull: true,
    defaultValue: null
  })
  approvedBy: number;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'CreatedBy'
  })
  @Column({
    allowNull: false
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'ModifiedBy'
  })
  @Column({
    allowNull: false
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
