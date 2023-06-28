import { Table, Model, Column, DataType, Sequelize } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "registeredCourses",
})

export class RegCourses extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  studentId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  courseId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  teacherId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  slotId!: string;
}