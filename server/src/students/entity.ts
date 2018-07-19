import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import Batch from "../batches/entity";
import Evaluations from "../evaluation/entity";
import { IsString } from "class-validator";

type Colour = 'red' | 'yellow' | 'green' | 'white'

@Entity()
export default class Students extends BaseEntity  {
    
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @Column('text')
    firstName: string

    @IsString()
    @Column('text')
    lastName: string

    @IsString()
    @Column('text')
    profilePic: string 

    @IsString()
    @Column('text', { default: 'white/#ffffff' })
    lastEvaluation: Colour
    
    @ManyToOne(_ => Batch, batch => batch.students, { onDelete: 'CASCADE' })
    batch: Batch

    // @Column({ name: 'batch' })
    // batchNumber: string

    @OneToMany(_ => Evaluations, evaluations => evaluations.student, {eager:true}) 
    evaluations: Evaluations[]
}