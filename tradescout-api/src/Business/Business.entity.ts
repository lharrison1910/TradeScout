import { Invoice } from '../Invoice/Invoice.entity';
import { Expense } from '../Expense/Expense.entity';
import { Income } from '../Income/Income.entity';
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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  taxReference?: string | null;

  @Column()
  userId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Income, (income) => income.business)
  income: Income[];

  @OneToMany(() => Expense, (expense) => expense.business)
  expense: Expense[];

  @ManyToOne(() => User, (user) => user.businesses)
  user: User;

  @OneToMany(() => Invoice, (invoice) => invoice.business)
  invoices: Invoice[];
}
