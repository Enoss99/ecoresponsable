import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from 'typeorm';
import { Societe } from './Societe';

@Entity()
export class Utilisateur extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nom!: string;
  
  @Column()
  prenom!: string;

  @Column()
  password!: string;

  @Column({default: false})
  isadmin!: boolean;

  @Column({ default: true })
  isactive!: boolean;


  @Column({ unique: true })
  email!: string;

  @ManyToOne(() => Societe, societe => societe.utilisateurs)
  societe!: Societe;
}
