import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { Reponse } from './Reponse';
import { Produit } from './Produit';
import { Question } from './Question';
import { EvaluationQuestionReponse } from './EvaluationQuestionReponse';


@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Produit, produit => produit.evaluations)
  produit!: Produit;

  @OneToMany(() => EvaluationQuestionReponse, eqr => eqr.evaluation)
  reponses!: EvaluationQuestionReponse[];

  @Column({ default: 'en_cours' })
  etat!: 'en_cours' | 'terminee';

}
