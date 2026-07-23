import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Income } from '../Income/Income.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  customerName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amountDue: number;

  @Column({ default: 'UNPAID' })
  status: string;

  @Column()
  url: string;

  @OneToOne(() => Income, (income) => income.invoice)
  income: Income;
}
