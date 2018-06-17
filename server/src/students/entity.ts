import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import Batches from "../batches/entity";
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
    @Column('text', { default: 'white' })
    lastEvaluation: Colour
    
    @ManyToOne(_ => Batches, batches => batches.students, { onDelete: 'CASCADE' })
    batches: Batches

    // @Column({ name: 'batch' })
    // batchNumber: string

    @OneToMany(_ => Evaluations, evaluations => evaluations.student, {eager:true}) 
    evaluations: Evaluations[]
}