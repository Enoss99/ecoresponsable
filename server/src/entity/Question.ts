import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Rubrique } from './Rubrique';
import { EvaluationQuestionReponse } from './EvaluationQuestionReponse';

interface ChoixReponse {
  texte: string;
  valeur: number;
}



@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  texte!: string;

  @ManyToOne(() => Rubrique, rubrique => rubrique.questions)
  rubrique!: Rubrique;

  @Column('json')
  choixreponse!: ChoixReponse[];

  @OneToMany(() => EvaluationQuestionReponse, (eqr: EvaluationQuestionReponse) => eqr.question)
  evaluationQuestionReponses!: EvaluationQuestionReponse[];
}
