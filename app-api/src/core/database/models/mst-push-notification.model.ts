import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_push_notification',
  timestamps: true
})
export class MstPushNotification extends Model<MstPushNotification> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  pushNotificationId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING(150),
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  imagePath: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'PushNotificationCreatedBy'
  }) @Column({allowNull: false}) createdBy: number;
  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'PushNotificationModifiedBy'
  }) @Column({allowNull: false}) modifiedBy: number;
}
