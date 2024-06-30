import { Column, DataType, Table, Model, UpdatedAt, CreatedAt, ForeignKey } from 'sequelize-typescript';
import { EventModel } from './event.model';
import { FamilyModel } from '@server/common';

@Table({
  tableName: 'txn_event_interested_member',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class EventInterestedModel extends Model<EventInterestedModel> {
  @Column({
    field: 'event_contact_person_number_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  eventContactPersonNumberId: number;

  @ForeignKey(() => EventModel)
  @Column({
    field: 'event_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'EventModel',
      key: 'event_id',
    },
  })
  eventId: number;

  @ForeignKey(() => FamilyModel)
  @Column({
    field: 'family_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'FamilyModel',
      key: 'family_id',
    },
  })
  familyId: number;

  @Column({
    field: 'interested',
    allowNull: false,
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  interested: boolean;

  @Column({
    field: 'active',
    allowNull: false,
    defaultValue: true,
    type: DataType.BOOLEAN,
  })
  active: boolean;

  @CreatedAt
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @UpdatedAt
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @Column({
    field: 'created_ip',
    allowNull: true,
    type: DataType.STRING(50),
  })
  createdIp: string;

  @Column({
    field: 'modified_ip',
    allowNull: true,
    type: DataType.STRING(50),
  })
  modifiedIp: string;
}
