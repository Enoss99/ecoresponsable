import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Evaluation } from './Evaluation';
import { Question } from './Question';

@Entity()
export class Reponse {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  Question!: string;
  
  @Column()
  valeur!: string;

  @ManyToOne(() => Evaluation, evaluation => evaluation.reponses)
  evaluation!: Evaluation;

  @ManyToOne(() => Question, question => question.reponses)
  question!: Question;
}
