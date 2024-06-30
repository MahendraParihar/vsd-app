import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'mst_admin_role',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class AdminRoleModel extends Model<AdminRoleModel> {
  @Column({
    field: 'admin_role_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  adminRoleId: number;

  @Column({
    field: 'admin_role',
    allowNull: false,
    type: DataType.STRING(100),
  })
  adminRole: string;

  @Column({
    field: 'permission_set',
    allowNull: true,
    type: DataType.ARRAY(DataType.NUMBER),
  })
  permissionSet: number[];
}
