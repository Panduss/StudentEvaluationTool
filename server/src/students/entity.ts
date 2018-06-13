import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import Batch from "../batches/entity";
import Evalu from "../evaluation/entity";
import { IsString } from "class-validator";

type Colour = "red" | "yellow" | "green"

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
    @Column('text', {nullable: true})
    lastEvaluation: Colour
    
    @ManyToOne(_ => Batch, batch => batch.students)
    batch: Batch

    // @Column({ name: 'batch' })
    // batchNumber: string

    @OneToMany(_ => Evalu, evalu => evalu.student, {eager:true}) 
    evalu: Evalu[]
}