import {BelongsTo, Column, DataType, Index, Model, Table} from 'sequelize-typescript';
import {TxnFamily} from './txn-family.model';
import {TxnEvent} from './txn-event.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'txn_event_coordinator',
  timestamps: true
})
export class TxnEventCoordinator extends Model<TxnEventCoordinator> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  eventCoordinatorId: number;

  @BelongsTo(() => TxnFamily, {
    foreignKey: 'familyId',
    targetKey: 'familyId',
    as: 'EventCoordinatorFamily'
  })
  @Column({
    allowNull: false,
  })
  familyId: number;

  @Index('idx-event-coordinator-event-id')
  @BelongsTo(() => TxnEvent, {
    foreignKey: 'eventId',
    targetKey: 'eventId',
    as: 'EventCoordinatorEvent'
  })
  @Column({
    allowNull: false,
  })
  eventId: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  post: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
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
