import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'mst_permission_set',
  schema: 'public',
  freezeTableName: true,
  timestamps: false,
})
export class PermissionsModel extends Model<PermissionsModel> {
  @Column({
    field: 'permission_set_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  permissionSetId: number;

  @Column({
    field: 'permission',
    allowNull: false,
    type: DataType.STRING,
  })
  permission: string;

  @Column({
    field: 'permission_set',
    allowNull: false,
    type: DataType.ARRAY(DataType.STRING),
  })
  permissionSet: string[];
}
