import { Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { ContactTypeModel, FamilyModel } from '@server/common';

@Table({
  tableName: 'txn_family_contact_number',
  schema: 'public',
  freezeTableName: true,
  timestamps: true,
})
export class FamilyContactNumberModel extends Model<FamilyContactNumberModel> {
  @Column({
    field: 'family_contact_number_id',
    allowNull: false,
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  familyContactNumberId: number;

  @ForeignKey(() => ContactTypeModel)
  @Column({
    field: 'contact_type_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'ContactTypeModel',
      key: 'contact_type_id',
    },
  })
  contactTypeId: number;

  @ForeignKey(() => FamilyModel)
  @Column({
    field: 'family_id',
    allowNull: false,
    type: DataType.NUMBER,
    references: {
      model: 'FamilyModel',
      key: 'family_id',
    },
  })
  familyId: number;

  @Column({
    field: 'contact_number',
    allowNull: false,
    type: DataType.NUMBER,
  })
  contactNumber: number;

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
    field: 'modified_by',
    type: DataType.INTEGER,
  })
  modifiedBy: number;

  @Column({
    field: 'created_ip',
    allowNull: true,
    type: DataType.STRING(50),
  })
  createdIp: string;

  @Column({
    field: 'modified_ip',
    allowNull: true,
    type: DataType.STRING(50),
  })
  modifiedIp: string;
}
