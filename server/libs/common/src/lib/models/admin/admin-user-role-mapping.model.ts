import { Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { AdminRoleModel } from './admin-role.model';
import { AdminUserModel } from './admin-user.model';

@Table({
  tableName: 'mst_admin_user_role_mapping',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class AdminUserRoleMappingModel extends Model<AdminUserRoleMappingModel> {
  @Column({
    field: 'admin_user_role_mapping_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  adminUserRoleMappingId: number;

  @ForeignKey(() => AdminUserModel)
  @Column({
    field: 'admin_user_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'AdminModel',
      key: 'admin_user_id',
    },
  })
  adminUserId: number;

  @ForeignKey(() => AdminRoleModel)
  @Column({
    field: 'admin_role_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'AdminRoleModel',
      key: 'admin_role_id',
    },
  })
  adminRoleId: number;

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
    field: 'modified_by',
    type: DataType.INTEGER,
  })
  modifiedBy: number;

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
