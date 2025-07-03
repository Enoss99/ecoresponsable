import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Utilisateur } from './Utilisateur';
import { Site } from './Site';

@Entity()
export class Societe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nom!: string;

  @OneToMany(() => Utilisateur, utilisateur => utilisateur.societe)
  utilisateurs!: Utilisateur[];

  @OneToMany(() => Site, site => site.societe)
  sites!: Site[];
}
