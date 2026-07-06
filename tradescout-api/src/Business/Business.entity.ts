import { Expense } from '../Expense/Expense.entity';
import { Income } from '../Income/Income.entity';
import { User } from '../User/User.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('business')
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  taxReference: string;

  @Column()
  userId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Income, (income) => income.businessId)
  income: Income[];

  @OneToMany(() => Expense, (expense) => expense.businessId)
  expense: Expense[];

  @OneToMany(() => User, (user) => user.businesses)
  user: User;
}
