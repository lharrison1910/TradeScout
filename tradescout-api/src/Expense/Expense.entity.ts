import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MtdExpenseCategory } from './ExpernseCategory';
import { User } from '../User/User.entity';
import { Business } from '../Business/Business.entity';
import { Invoice } from '../Invoice/Invoice.entity';

@Entity('Expense')
export class Expense {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id: number;

  @Column({ type: 'uuid' })
  businessId: string;

  @Column({ type: 'integer' })
  userId: number;

  @Column({ type: 'timestamp' })
  datePaid: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: MtdExpenseCategory,
    default: MtdExpenseCategory.TOTAL_EXPENSES,
  })
  category: MtdExpenseCategory;

  @Column({ type: 'boolean', default: false })
  isMileageClaim: boolean;

  @Column({ type: 'boolean', default: false })
  isCapitalAsset: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  receiptImageUrl: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.expenses, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Business, (business) => business.expense)
  @JoinColumn({ name: 'businessId' })
  business: Business;


  @Column({type: 'integer', nullable: true})
  invoiceId: number

  @ManyToOne(()=> Invoice, (invoice) => invoice.jobExpenses)
  @JoinColumn({name: 'invoiceId'})
  invoice: Invoice

}
