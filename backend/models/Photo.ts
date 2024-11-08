import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link: string;

  @Column()
  description: string;

  constructor(link: string, description: string) {
    this.link = link;
    this.description = description;
  }
}

export default Photo;