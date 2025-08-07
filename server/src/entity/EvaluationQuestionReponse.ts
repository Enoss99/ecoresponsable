import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';

import { Question } from './Question';
import { Evaluation } from './Evaluation';
import { Rubrique } from './Rubrique';

interface ChoixReponse {
  texte: string;
  valeur: number;
}


@Entity()
export class EvaluationQuestionReponse {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Question, question => question.evaluationQuestionReponses)
    question!: Question;

    @ManyToOne(() => Evaluation, evaluation => evaluation.reponses)
    evaluation!: Evaluation;


    @ManyToOne(() => Rubrique, rubrique => rubrique.questions)
    rubrique!: Rubrique;


    @Column('json')
    choixreponse!: ChoixReponse[];

    @Column()
    reponse!: number;
    @Column()
    valeur!: number;
    }
