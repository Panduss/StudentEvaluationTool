import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm'
import Student from '../students/entity'
import Evalu from '../evaluation/entity'

@Entity()
export default class Batch extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', { nullable: true })
    batchNumber: number

    @Column('text', { nullable: true })
    startDate: string

    @Column('text', { nullable: true })
    endDate: string

    @OneToMany(_ => Student, student => student.batch, {eager:true})
    students: Student[]

    @OneToMany(_ => Evalu, evalu => evalu.batch, {eager:true})
    evalu: Evalu[]
}