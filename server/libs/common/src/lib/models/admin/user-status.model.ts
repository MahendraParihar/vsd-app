import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'mst_user_status',
  schema: 'public',
  freezeTableName: true,
  timestamps: false,
})
export class UserStatusModel extends Model<UserStatusModel> {
  @Column({
    field: 'user_status_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  userStatusId: number;

  @Column({
    field: 'user_status',
    allowNull: false,
    type: DataType.STRING(50),
  })
  userStatus: string;
}
