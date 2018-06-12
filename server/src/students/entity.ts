import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import Batch from "../batches/entity";
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
    
    @ManyToOne(_ => Batch, batch => batch.students, {eager: false})
    batch: Batch
    
}