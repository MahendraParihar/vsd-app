import {Column, DataType, Model, Table} from 'sequelize-typescript';

@Table({
  modelName: 'mst_table'
})
export class MstTable extends Model<MstTable> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  tableId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  table: string;
}
