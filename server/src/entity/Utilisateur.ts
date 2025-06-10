import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Societe } from './Societe';

@Entity()
export class Utilisateur {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nom!: string;
  
  @Column()
  prenom!: string;

  @Column()
  isadmin!: boolean;

  @Column({ unique: true })
  email!: string;

  @ManyToOne(() => Societe, societe => societe.utilisateurs)
  societe!: Societe;
}
