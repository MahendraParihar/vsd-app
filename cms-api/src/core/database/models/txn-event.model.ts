import {BelongsTo, Column, DataType, Model, Table} from 'sequelize-typescript';
import {TxnAddress} from './txn-address.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_event',
  timestamps: true
})
export class TxnEvent extends Model<TxnEvent> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  eventId: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true
  })
  date: Date;

  @Column({
    type: DataType.TIME,
    allowNull: true,
  })
  time: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  imagePath: string;

  @BelongsTo(() => TxnAddress, {
    foreignKey: 'addressId',
    targetKey: 'addressId',
    as: 'EventAddress'
  })
  @Column({
    allowNull: true,
  })
  addressId: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  visitedCount: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  noOfDays: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  downloadPath: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: true,
  })
  urlPath: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  agenda: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  active: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  isPublished: boolean;

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
    type: DataType.STRING(100),
  })
  createdIp: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(100),
  })
  modifiedIp: string;
}
