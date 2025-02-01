import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { EventModel } from './event.model';
import { FamilyModel, PostModel } from '@server/common';

@Table({
  tableName: 'txn_event_coordinator',
  schema: 'public',
  freezeTableName: true,
  timestamps: false,
  updatedAt: false,
  createdAt: false,
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

  @BelongsTo(() => PostModel, { as: 'post', foreignKey: 'postId', targetKey: 'postId' })
  post: PostModel;

  @BelongsTo(() => FamilyModel, { as: 'family', foreignKey: 'familyId', targetKey: 'familyId' })
  family: FamilyModel;
}
