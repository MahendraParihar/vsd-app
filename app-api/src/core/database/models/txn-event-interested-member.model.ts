import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {TxnEvent} from './txn-event.model';
import {TxnAppUser} from './txn-app-user.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_event_interested_member',
  timestamps: true
})
export class TxnEventInterestedMember extends Model<TxnEventInterestedMember> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  eventInterestedMemberId: number;

  @BelongsTo(() => TxnAppUser, {
    foreignKey: 'appUserId',
    targetKey: 'appUserId',
    as: 'EventInterestedAppUser'
  })
  @Column({
    allowNull: false,
  })
  appUserId: number;

  @BelongsTo(() => TxnEvent, {
    foreignKey: 'eventId',
    targetKey: 'eventId',
    as: 'EventInterestedEvent'
  })
  @Column({
    allowNull: false,
  })
  eventId: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isInterested: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'EventInterestedCreatedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'EventInterestedModifiedBy'
  })
  @Column({
    allowNull: false,
    defaultValue: null
  })
  modifiedBy: number;
}
