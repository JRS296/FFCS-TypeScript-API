import { Table, Model, Column, DataType, Sequelize } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "timings",
})

export class Timings extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  day!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  start!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  end!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fkey!: string;
}