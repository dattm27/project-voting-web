import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm"
import Election from "./Election";

@Entity()
export class Candidate {
    @PrimaryColumn() id : number;

    @Column()
    name: string

    @Column()
    birthDay: Date

    @Column()
    description: string

    @Column()
    roll: string

    @Column()
    votes: number

    @Column()
    electionId: number

    @Column()
    photoLink: string

    @ManyToOne(() => Election, election => election.candidates)
    election: Election;

    constructor (id: number, name: string, avatarId: number, birthDay: Date ,description: string, roll: string, votes: number, electionId: number, photoLink: string) {
        this.id = id
        this.name = name
        this.birthDay = birthDay
        this.description = description
        this.roll = roll
        this.votes = votes
        this.electionId = electionId
        this.photoLink = photoLink
    }
}

export default Candidate