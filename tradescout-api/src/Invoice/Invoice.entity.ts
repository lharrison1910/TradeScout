import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  // ManyToOne,
  // OneToMany,
  // JoinColumn,
} from 'typeorm';
// import { Business } from '../../business/entities/business.entity';
// import { Income } from '../../income/entities/income.entity';
// import { Expense } from '../../expense/entities/expense.entity';
import { InvoiceStatusEnum } from '../types/invoiceSchema';
@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column()
  invoiceNumber: string;

  @Column()
  customerName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ enum: InvoiceStatusEnum, default: 'UNPAID' })
  status: InvoiceStatusEnum;

  @Column({ type: 'jsonb', nullable: true })
  snapshotData: Record<string, any>;

  @Column({ type: 'varchar', nullable: true })
  fileUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  // --- Relationships ---
  // @ManyToOne(() => Business, (business) => business.invoices)
  // @JoinColumn({ name: 'businessId' })
  // business: Business;

  // @Column()
  // businessId: string;

  // // 🚀 The Hub: Links to Payments and Job Expenses
  // @OneToMany(() => Income, (income) => income.invoice)
  // payments: Income[];

  // @OneToMany(() => Expense, (expense) => expense.invoice)
  // jobExpenses: Expense[];
}
