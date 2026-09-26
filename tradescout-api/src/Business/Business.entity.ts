
import { Invoice } from 'src/Invoice/Invoice.entity';
import { User } from '../User/User.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('business')
export class Business {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({type: 'varchar'})
  businessName: string;

  @Column({type: 'varchar'})
  vatNumber: string

  @Column({type: 'varchar'})
  taxReference: string;

  @Column({type: 'varchar'})
  bankName: string;

  @Column({type: 'varchar'})
  bankAccountName: string;

  @Column({type: 'varchar'})
  bankAccountNumber: string;

  @Column({type: 'varchar'})
  bankSortCode: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.businesses)
  user: User;

  @OneToMany(() => Invoice, (invoice) => invoice.business)
  invoices: Invoice[];
}
