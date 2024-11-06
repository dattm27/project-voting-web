import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Photo{
    @PrimaryGeneratedColumn()
    id;

    @Column()
    link;

    @Column()
    description;

    constructor(link, description){
        this.link = link;
        this.description = description;
    }
}