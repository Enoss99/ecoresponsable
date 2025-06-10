import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Question } from './Question';

@Entity()
export class Rubrique {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titre!: string;

  @OneToMany(() => Question, question => question.rubrique)
  questions!: Question[]; 
}
