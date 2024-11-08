import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import Candidate from './Candidate';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @Column()
  description: string;

  @OneToOne(() => Candidate, candidate => candidate.avatarId)
  candidate : Candidate;

  constructor(link: string, description: string) {
    this.link = link;
    this.description = description;
  }
}

export default Photo;