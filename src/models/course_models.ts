import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "course",
})

export class Course extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true
  })
  primKey!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id!: string;

  @Column({
    type: DataType.JSON(),
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.JSON(),
    allowNull: false,
  })
  slot_ids!: string;

  @Column({
    type: DataType.JSON(),
    allowNull: false,
  })
  faculty_ids!: string;

  @Column({
    type: DataType.JSON(),
    allowNull: false,
  })
  course_type!: string;
}

/*

  
*/