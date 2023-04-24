import {BelongsTo, Column, DataType, Index, Model, Table} from 'sequelize-typescript';
import {TxnFamily} from './txn-family.model';
import {MstContactType} from './mst-contact-type.model';
import {MstAdminUser} from "./mst-admin-user.model";
import {DEFAULT_CONTACT_NUMBER_COUNTRY_CODE} from "../../../constants/config-constants";

@Table({
  modelName: 'txn_family_contact_number',
  timestamps: true
})
export class TxnFamilyContactNumber extends Model<TxnFamilyContactNumber> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  familyContactNumberId: number;

  @Index('idx-contact-type-family-id')
  @BelongsTo(() => TxnFamily, {
    foreignKey: 'familyId',
    targetKey: 'familyId',
    as: 'FamilyContactNumberFamily'
  })
  @Column({
    allowNull: false,
  })
  familyId: number;

  @BelongsTo(() => MstContactType, {
    foreignKey: 'contactTypeId',
    targetKey: 'contactTypeId',
    as: 'FamilyContactNumberContactType'
  })
  @Column({
    allowNull: false,
  })
  contactTypeId: number;

  @Column({
    type: DataType.STRING(5),
    allowNull: false,
    defaultValue: DEFAULT_CONTACT_NUMBER_COUNTRY_CODE
  })
  countryCode: string;

  @Column({
    type: DataType.STRING(16),
    allowNull: false,
    unique: true
  })
  contactNumber: string;

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
