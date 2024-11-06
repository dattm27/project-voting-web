import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Candidate{
    @PrimaryGeneratedColumn()
    id;

    @Column()
    name;

    @Column()
    avatar_id;

    @Column()
    birthday;

    @Column()
    votes;

    @Column()
    description;

    @Column()
    election_id;

    constructor(name, avatar_id, birthday, votes, description, election_id){
        this.name = name;
        this.avatar_id = avatar_id;
        this.birthday = birthday;
        this.votes = votes;
        this.description = description;
        this.election_id = election_id;
    }
}