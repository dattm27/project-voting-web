import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Election{
    @PrimaryGeneratedColumn()
    id;

    @Column()
    name;

    @Column()
    startDate;

    @Column()
    endDate;

    @Column()
    description;

    @Column()
    status;

    constructor(name, startDate, endDate, description, status){
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.status = status;
    }
}