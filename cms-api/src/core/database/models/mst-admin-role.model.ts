import {Column, DataType, Model, Table} from 'sequelize-typescript';

@Table({
  modelName: 'mst_admin_role',
  timestamps: true
})
export class MstAdminRole extends Model<MstAdminRole> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  roleId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  role: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;
}
