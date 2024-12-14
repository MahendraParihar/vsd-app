import { Column, DataType, Table, Model, UpdatedAt, CreatedAt } from 'sequelize-typescript';

@Table({
  tableName: 'mst_table',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class TableModel extends Model<TableModel> {
  @Column({
    field: 'table_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  tableId: number;

  @Column({
    field: 'table_name',
    allowNull: false,
    type: DataType.STRING(50),
  })
  tableName: string;

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
}
