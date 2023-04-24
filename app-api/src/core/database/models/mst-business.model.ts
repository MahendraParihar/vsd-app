import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_business',
  timestamps: true
})
export class MstBusiness extends Model<MstBusiness> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  businessId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  business: string;

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
    as: 'BusinessCreatedBy'
  })
  @Column({
    allowNull: false
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'BusinessModifiedBy'
  })
  @Column({
    allowNull: false
  })
  modifiedBy: number;
}
