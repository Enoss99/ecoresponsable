import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Site } from './Site';
import { Evaluation } from './Evaluation';

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nom!: string;

  @ManyToOne(() => Site, site => site.produits)
  site!: Site;

  @OneToMany(() => Evaluation, evaluation => evaluation.produit)
  evaluations!: Evaluation[];
}
