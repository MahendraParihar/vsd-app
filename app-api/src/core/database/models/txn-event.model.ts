import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {TxnAddress} from './txn-address.model';
import json = require('sequelize');
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
    type: DataType.STRING(100),
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

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'EventCreatedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'EventModifiedBy'
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
