import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm'
import Student from '../students/entity'
import Batch from '../batches/entity'

type Colour = "red" | "yellow" | "green"

@Entity()
export default class Evaluations extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text', {nullable: true})
    remarks: string

    @Column('text', {nullable: false})
    colour: Colour

    @Column('text', { default: new Date().toISOString() })
    date: string

    @ManyToOne(_ => Student, student => student.evaluations, { onDelete: 'CASCADE', nullable: false })
    student: Student

    @ManyToOne(_ => Batch, batch => batch.evaluations, { onDelete: 'CASCADE', nullable: false })
    batch: Batch
}
