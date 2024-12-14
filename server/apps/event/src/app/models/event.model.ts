import {
  Column,
  DataType,
  Table,
  Model,
  UpdatedAt,
  CreatedAt,
  ForeignKey,
  Scopes,
  BelongsTo
} from 'sequelize-typescript';
import {AddressModel, AdminUserModel} from '@server/common';

@Table({
  tableName: 'txn_event',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
@Scopes(() => ({
  list: {
    include: [
      {
        attributes: ['adminUserId', 'firstName', 'lastName'],
        model: AdminUserModel,
        required: true,
        as: 'createdByUser',
      },
      {
        attributes: ['adminUserId', 'firstName', 'lastName'],
        model: AdminUserModel,
        required: true,
        as: 'updatedByUser',
      },
    ],
  },
}))
export class EventModel extends Model<EventModel> {
  @Column({
    field: 'event_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  eventId: number;

  @Column({
    field: 'title',
    allowNull: false,
    type: DataType.STRING(100),
  })
  title: string;

  @Column({
    field: 'description',
    allowNull: false,
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    field: 'date',
    allowNull: true,
    type: DataType.DATEONLY,
  })
  date: Date;

  @Column({
    field: 'time',
    allowNull: true,
    type: DataType.TIME,
  })
  time: Date;

  @ForeignKey(() => AddressModel)
  @Column({
    field: 'address_id',
    allowNull: true,
    type: DataType.NUMBER,
    references: {
      model: 'AddressModel',
      key: 'address_id',
    },
  })
  addressId: number;

  @Column({
    field: 'event_days',
    allowNull: true,
    type: DataType.NUMBER,
  })
  eventDays: number;

  @Column({
    field: 'image_path',
    allowNull: true,
    type: DataType.JSONB,
  })
  imagePath: object;

  @Column({
    field: 'download_path',
    allowNull: true,
    type: DataType.JSONB,
  })
  downloadPath: object;

  @Column({
    field: 'agenda',
    allowNull: true,
    type: DataType.JSONB,
  })
  agenda: object;

  @Column({
    field: 'visited_count',
    allowNull: false,
    defaultValue: 0,
    type: DataType.NUMBER,
  })
  visitedCount: number;

  @Column({
    field: 'tags',
    allowNull: true,
    type: DataType.ARRAY(DataType.STRING),
  })
  tags: string[];

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

  @BelongsTo(() => AdminUserModel, {as: 'createdByUser', foreignKey: 'createdBy', targetKey: 'adminUserId'})
  createdByUser: AdminUserModel;

  @BelongsTo(() => AdminUserModel, {as: 'updatedByUser', foreignKey: 'updatedBy', targetKey: 'adminUserId'})
  updatedByUser: AdminUserModel;

  @BelongsTo(() => AddressModel, {as: 'address', foreignKey: 'addressId', targetKey: 'addressId'})
  address: AddressModel;
}
