import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Societe } from './Societe';
import { Produit } from './Produit';

@Entity()
export class Site {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nom!: string;

  @ManyToOne(() => Societe, societe => societe.sites)
  @JoinColumn()
  societe!: Societe;

  @OneToMany(() => Produit, produit => produit.site)
  produits!: Produit[];
}
