import {BelongsTo, Column, DataType, Model, Table} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_current_affair',
  timestamps: true
})
export class TxnCurrentAffair extends Model<TxnCurrentAffair> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  currentAffairId: number;

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
    type: DataType.STRING(10),
    allowNull: true,
  })
  time: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  imagePath: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  source: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  isApproved: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  active: boolean;

  @Column({
    type: DataType.INTEGER,
    defaultValue: null,
    allowNull: true,
  })
  approvedBy: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  commentsAllow: boolean;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  visitedCount: number;

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
