import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_caste',
  timestamps: true
})
export class MstCaste extends Model<MstCaste> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  casteId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  caste: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'CasteCreatedBy'
  })
  @Column({
    allowNull: false
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'CasteModifiedBy'
  })
  @Column({
    allowNull: false
  })
  modifiedBy: number;
}
