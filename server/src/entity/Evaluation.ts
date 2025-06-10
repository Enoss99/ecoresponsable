import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Reponse } from './Reponse';
import { Produit } from './Produit';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Produit, produit => produit.evaluations)
  produit!: Produit;

  @OneToMany(() => Reponse, reponse => reponse.evaluation)
  reponses!: Reponse[];
}
