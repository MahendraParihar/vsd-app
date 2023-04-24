import {Column, DataType, Model, Table} from 'sequelize-typescript';

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
