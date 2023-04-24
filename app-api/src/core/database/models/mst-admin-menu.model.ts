import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_admin_menus',
  timestamps: true
})
export class MstAdminMenu extends Model<MstAdminMenu> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  menuId: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  menu: string;

  @Column({
    allowNull: false,
  })
  parent: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  path: string;

  @Column({
    allowNull: false,
  })
  icon: string;

  @Column({
    allowNull: false,
  })
  sequence: number;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;
}
