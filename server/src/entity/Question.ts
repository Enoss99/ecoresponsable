import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Rubrique } from './Rubrique';

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
}
