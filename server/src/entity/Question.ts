import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Rubrique } from './Rubrique';
import { Reponse } from './Reponse';

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

  choixReponse!: ChoixReponse[];
}
