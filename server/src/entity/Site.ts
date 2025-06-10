import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Societe } from './Societe';
import { Produit } from './Produit';

@Entity()
export class Site {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nom!: string;

  @ManyToOne(() => Societe, societe => societe.sites)
  societe!: Societe;

  @OneToMany(() => Produit, produit => produit.site)
  produits!: Produit[];
}
