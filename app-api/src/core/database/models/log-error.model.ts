import {Column, CreatedAt, DataType, Model, Table} from 'sequelize-typescript';

@Table({
  modelName: 'log_errors'
})
export class LogError extends Model<LogError> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  errorId: number;

  @Column({
    allowNull: false,
  })
  environment: string;

  @Column({
    allowNull: false,
  })
  hosturl: string;

  @Column({
    allowNull: true,
  })
  controller: string;

  @Column({
    allowNull: true,
  })
  methodname: string;

  @Column({
    allowNull: true,
  })
  exceptionMessage: string;

  @Column({
    allowNull: true,
  })
  exceptionMessageSQL: string;

  @Column({
    allowNull: true,
  })
  exceptionCode: string;

  @Column({
    allowNull: true,
  })
  exceptionType: string;

  @Column({
    allowNull: true,
  })
  exceptionStacktrace: string;

  @CreatedAt
  createdAt: Date;
}
