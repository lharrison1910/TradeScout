import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MtdIncomeCategory } from './IncomeCategory';
import { User } from 'src/User/User.entity';
import { Business } from 'src/Business/Business.entity';
import { Invoice } from 'src/Invoice/Invoice.entity';

@Entity('Income')
export class Income {
  @PrimaryGeneratedColumn({ type: 'integer' })
  id!: number;

  @Column({ type: 'uuid' })
  businessId: string;

  @Column({ type: 'integer' })
  userId: number;

  @Column({ type: 'timestamp' })
  dateReceived: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: MtdIncomeCategory,
    default: MtdIncomeCategory.TOTAL_INCOME,
  })
  category: MtdIncomeCategory;

  @Column({ type: 'varchar', length: 50, nullable: true })
  paymentMethod: string;

  @Column({ type: 'boolean', default: false })
  isDailyTotal: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reference: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.incomes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Business, (business) => business.income)
  @JoinColumn({ name: 'businessId' })
  business: Business;

  @OneToOne(() => Invoice, (invoice) => invoice.income)
  invoice: Invoice;
}
