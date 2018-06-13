import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm'
import Student from '../students/entity'
import Batch from '../batches/entity'

type Colour = "red" | "yellow" | "green"

let today  = new Date().toLocaleDateString("en-US");

@Entity()
export default class Evalu extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', {nullable: true})
    remarks: string

    @Column('text', {nullable: false})
    colour: Colour

    @Column('text', {default: today} )
    date: string

    @ManyToOne(_ => Student, student => student.evalu, { nullable: false})
    student: Student

    @ManyToOne(_ => Batch, batch => batch.evalu, { nullable: false})
    batch: Batch
}
