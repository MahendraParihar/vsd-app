import {BelongsTo, Column, CreatedAt, DataType, Index, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {TxnFamily} from './txn-family.model';
import {MstGender} from './mst-gender.model';
import {MstMaritalStatus} from './mst-marital-status.model';
import {MstReligion} from './mst-religion.model';
import {MstCaste} from './mst-caste.model';
import {MstGotra} from './mst-gotra.model';
import {MstRaasi} from './mst-raasi.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_family_profile',
  timestamps: true
})
export class TxnFamilyProfile extends Model<TxnFamilyProfile> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  familyProfileId: number;

  @Index('idx-family-profile-family-id')
  @BelongsTo(() => TxnFamily, {
    foreignKey: 'familyId',
    targetKey: 'familyId',
    as: 'FamilyProfileFamily'
  })
  @Column({
    allowNull: true,
  })
  familyId: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  dateOfBirth: Date;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  height: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  weight: number;

  @BelongsTo(() => MstGender, {
    foreignKey: 'genderId',
    targetKey: 'genderId',
    as: 'FamilyProfileGender'
  })
  @Column({
    allowNull: true,
  })
  genderId: number;

  @BelongsTo(() => MstMaritalStatus, {
    foreignKey: 'maritalStatusId',
    targetKey: 'maritalStatusId',
    as: 'FamilyProfileMaritalStatus'
  })
  @Column({
    allowNull: true,
  })
  maritalStatusId: number;

  @BelongsTo(() => MstReligion, {
    foreignKey: 'religionId',
    targetKey: 'religionId',
    as: 'FamilyProfileReligion'
  })
  @Column({
    allowNull: true,
  })
  religionId: number;

  @BelongsTo(() => MstCaste, {
    foreignKey: 'casteId',
    targetKey: 'casteId',
    as: 'FamilyProfileCaste'
  })
  @Column({
    allowNull: true,
  })
  casteId: number;

  @BelongsTo(() => MstGotra, {
    foreignKey: 'gotraId',
    targetKey: 'gotraId',
    as: 'FamilyProfileGotra'
  })
  @Column({
    allowNull: true,
  })
  gotraId: number;

  @BelongsTo(() => MstRaasi, {
    foreignKey: 'raasiId',
    targetKey: 'raasiId',
    as: 'FamilyProfileRaasi'
  })
  @Column({
    allowNull: true,
  })
  raasiId: number;

  @Column({
    allowNull: true,
    defaultValue: false
  })
  isMaglik: boolean;

  @Column({
    allowNull: true
  })
  description: string;

  @Column({
    type: DataType.STRING(500),
    allowNull: true
  })
  hobbies: string;

  @Column({
    allowNull: true,
    defaultValue: 0
  })
  monthlyIncome: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'FamilyProfileCreatedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'FamilyProfileModifiedBy'
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
