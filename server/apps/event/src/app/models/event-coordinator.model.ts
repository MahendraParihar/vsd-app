import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { EventModel } from './event.model';
import { FamilyModel, PostModel } from '@server/common';

@Table({
  tableName: 'txn_event_coordinator',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class EventCoordinatorModel extends Model<EventCoordinatorModel> {
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

  @ForeignKey(() => PostModel)
  @Column({
    field: 'post_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: PostModel,
      key: 'post_id',
    },
  })
  postId: number;

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

  @Column({
    field: 'created_by',
    type: DataType.INTEGER,
  })
  createdBy: number;

  @UpdatedAt
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @Column({
    field: 'updated_by',
    type: DataType.INTEGER,
  })
  updatedBy: number;

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

  @BelongsTo(() => PostModel, { as: 'post', foreignKey: 'postId', targetKey: 'postId' })
  post: PostModel;

  @BelongsTo(() => FamilyModel, { as: 'family', foreignKey: 'familyId', targetKey: 'familyId' })
  family: FamilyModel;
}
