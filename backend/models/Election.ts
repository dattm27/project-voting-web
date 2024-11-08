import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn} from "typeorm";
import Candidate from "./Candidate";
import Photo from "./Photo";

@Entity()
export class Election{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    name : string;

    @Column()
    startDate : Date;

    @Column()
    endDate : Date;

    @Column()
    description : string;

    @Column()
    status : number;

    @OneToMany(() => Candidate, candidate => candidate.election)
    candidates: Candidate[];

    constructor(name, startDate, endDate, description, status){
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.status = status;
    }
}

export default Election;