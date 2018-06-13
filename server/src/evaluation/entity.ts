import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm'
import Student from '../students/entity'

type Colour = "red" | "yellow" | "green"

@Entity()
export default class Evalu extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number
  
    @Column('text')
    remarks: string
  
    @Column('text')
    colour: Colour
  
    @Column('date')
    date: string

    @ManyToOne(_ => Student, student => student.evalu, { nullable: false})
    student: Student
  

}
