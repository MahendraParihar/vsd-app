import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAdminRole} from './mst-admin-role.model';
import {MstAdminMenu} from './mst-admin-menu.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_admin_role_permission',
  timestamps: true
})
export class MstAdminRolePermission extends Model<MstAdminRolePermission> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  rolePermissionId: number;

  @BelongsTo(() => MstAdminRole, {
    foreignKey: 'roleId',
    targetKey: 'roleId',
    as: 'AdminRolePermissionRole'
  })
  @Column({
    allowNull: false,
  })
  roleId: number;

  @BelongsTo(() => MstAdminMenu, {
    foreignKey: 'menuId',
    targetKey: 'menuId',
    as: 'AdminRolePermissionMenu'
  })
  @Column({
    allowNull: false,
  })
  menuId: number;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;
}
