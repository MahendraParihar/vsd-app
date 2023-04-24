import {BelongsTo, Column, DataType, Index, Model, Table} from 'sequelize-typescript';
import {MstCountry} from './mst-country.model';
import {MstAdminUser} from "./mst-admin-user.model";

@Table({
  modelName: 'mst_state',
  timestamps: true
})
export class MstState extends Model<MstState> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
  stateId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  state: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: true,
  })
  stateCode: string;

  @Index('idx-state-country-id')
  @BelongsTo(() => MstCountry, {
    foreignKey: 'countryId',
    targetKey: 'countryId',
    as: 'StateCountry'
  })
  @Column({
    allowNull: false,
  })
  countryId: number;

  @Column({
    allowNull: false,
    defaultValue: true
  })
  active: boolean;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'createdBy',
    targetKey: 'adminId',
    as: 'CreatedBy'
  }) @Column({allowNull: false}) createdBy: number;

  @BelongsTo(() => MstAdminUser, {
    foreignKey: 'modifiedBy',
    targetKey: 'adminId',
    as: 'ModifiedBy'
  }) @Column({allowNull: false}) modifiedBy: number;
}
