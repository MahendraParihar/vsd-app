import {BelongsTo, Column, CreatedAt, DataType, Index, Model, Table, UpdatedAt} from 'sequelize-typescript';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_country',
  timestamps: true
})
export class MstCountry extends Model<MstCountry> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  countryId: number;

  @Index('idx-country-name')
  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true
  })
  country: string;

  @Column({
    type: DataType.STRING(5),
    allowNull: true,
  })
  countryCode: string;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'CountryCreatedBy'
  })
  @Column({
    allowNull: false
  })
  createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'CountryModifiedBy'
  })
  @Column({
    allowNull: false
  })
  modifiedBy: number;
}
