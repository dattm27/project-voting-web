import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import Candidate from './Candidate';
import Election from './Election';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @Column({ type: 'varchar', default: '' })
  public_id: string;

  @Column()
  description: string;

  @OneToOne(() => Candidate, candidate => candidate.photo)
  candidate : Candidate;
  
  @OneToOne(() => Election, election => election.photo)
  election : Election;

  constructor(link: string, description: string, public_id: string) {
    this.link = link;
    this.description = description;
    this.public_id = public_id;
  }
}

export default Photo;