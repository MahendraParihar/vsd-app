import {BelongsTo, Column, CreatedAt, DataType, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_education_degree',
  timestamps: true
})
export class MstEducationDegree extends Model<MstEducationDegree> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  educationDegreeId: number;

  @Column({
    allowNull: false,
    defaultValue: 0
  })
  parentId: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  educationDegree: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'EducationDegreeCreatedBy'
  })
  @Column({
    allowNull: false
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'EducationDegreeModifiedBy'
  })
  @Column({
    allowNull: false
  })
  modifiedBy: number;
}
