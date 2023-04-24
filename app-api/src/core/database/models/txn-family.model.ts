import {BelongsTo, Column, CreatedAt, DataType, Index, Model, Table, UpdatedAt} from 'sequelize-typescript';
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
    allowNull: false,
  })
  appUserId: number;

  @Index('idx-family-email-id')
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  emailId: string;

  @Column({
    type: DataType.STRING(100),
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
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'FamilyCreatedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'FamilyModifiedBy'
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
