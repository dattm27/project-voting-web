import { Entity, Column, PrimaryColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import Election from "./Election";
import Photo from "./Photo";

@Entity()
export class Candidate {
    @PrimaryGeneratedColumn() id : number;

    @Column()
    name: string

    @Column()
    avatarId: number

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

    @ManyToOne(() => Election, election => election.candidates)
    election: Election;

    @OneToOne(() => Photo, photo => photo.candidate)
    photo: Photo;

    constructor (name: string, avatarId: number, birthDay: Date ,description: string, roll: string, votes: number, electionId: number) {
        this.name = name
        this.avatarId = avatarId
        this.birthDay = birthDay
        this.description = description
        this.roll = roll
        this.votes = votes
        this.electionId = electionId
    }
}

export default Candidate