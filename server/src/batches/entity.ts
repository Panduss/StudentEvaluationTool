import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm'
import Student from '../students/entity'

@Entity()
export default class Batches extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', { nullable: true })
    batchNumber: string

    @Column('text', { nullable: true })
    startDate: string

    @Column('text', { nullable: true })
    endDate: string

    @OneToMany(_ => Student, student => student.batches, {eager:true})
    students: Student[]
}