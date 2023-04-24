import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_service',
  timestamps: true
})
export class MstService extends Model<MstService> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  serviceId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  service: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: true,
  })
  imagePath: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'ServiceCreatedBy'
  }) @Column({allowNull: false}) createdBy: number;
  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'ServiceModifiedBy'
  }) @Column({allowNull: false}) modifiedBy: number;
}
