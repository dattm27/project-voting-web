import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, PrimaryColumn} from "typeorm";
import Candidate from "./Candidate";

@Entity()
export class Election{
    @PrimaryColumn()
    id: number;

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

    @Column()
    photoLink: string;

    @Column({nullable: true})
    walletAddress: string;

    @OneToMany(() => Candidate, candidate => candidate.election)
    candidates: Candidate[];

    constructor(id, name, startDate, endDate, description, status, photoLink, walletAddress){
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.status = status;
        this.photoLink = photoLink;
        this.walletAddress = walletAddress;
    }
}

export default Election;