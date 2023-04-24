import {BelongsTo, Column, DataType, Index, Model, Table} from 'sequelize-typescript';
import {MstBusiness} from './mst-business.model';
import {TxnAddress} from './txn-address.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_family_business',
  timestamps: true
})
export class TxnFamilyBusiness extends Model<TxnFamilyBusiness> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  familyBusinessId: number;

  @Index('idx-family-business-id')
  @BelongsTo(() => MstBusiness, {
    foreignKey: 'businessId',
    targetKey: 'businessId',
    as: 'FamilyBusiness'
  })
  @Column({
    allowNull: false,
  })
  businessId: number;

  @BelongsTo(() => TxnAddress, {
    foreignKey: 'addressId',
    targetKey: 'addressId',
    as: 'FamilyBusinessAddress'
  })
  @Column({
    allowNull: true,
  })
  addressId: number;

  @Column({
    allowNull: true,
  })
  websiteLink: string;

  @Column({
    allowNull: true,
    unique: true,
  })
  contactNumber: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    unique: true,
  })
  emailId: string;

  @Column({
    allowNull: true,
    type: DataType.JSONB,
  })
  bannerPath: string;

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
    allowNull: false,
    defaultValue: null
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'ModifiedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
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
