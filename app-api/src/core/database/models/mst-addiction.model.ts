import {BelongsTo, Column, DataType, Model, Table} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_addiction',
  timestamps: true,
  indexes: [{fields: ['addiction']}]
})
export class MstAddiction extends Model<MstAddiction> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  addictionId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  addiction: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'AddictionCreatedBy'
  })
  @Column({
    allowNull: false
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'AddictionModifiedBy'
  })
  @Column({
    allowNull: false
  })
  modifiedBy: number;
}
