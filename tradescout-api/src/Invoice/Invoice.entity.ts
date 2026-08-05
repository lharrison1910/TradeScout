import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { InvoiceStatusEnum } from './InvoiceEnums';
import { Business } from '../Business/Business.entity';
import { Expense } from '../Expense/Expense.entity';
import { Income } from '../Income/Income.entity';

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn({type: 'integer'})
  id: number;

  @Column()
  invoiceNumber: string;

  @Column()
  customerName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ enum: InvoiceStatusEnum, default: 'DRAFT' })
  status: InvoiceStatusEnum;

  @Column({type: 'jsonb', nullable: true})
  snapshotData?: Record<string, any>;

  @Column({ type: 'timestamp', nullable: true })
  issuedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date



  // --- Relationships ---
  
  @ManyToOne(() => Business, (business) => business.invoices)
  @JoinColumn({ name: 'businessId' })
  business: Business;

  @Column()
  businessId: string;

  @OneToMany(() => Income, (income) => income.invoice)
  income: Income[];

  @OneToMany(() => Expense, (expense) => expense.invoice)
  expenses: Expense[];
}