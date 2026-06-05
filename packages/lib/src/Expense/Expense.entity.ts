import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";
import { ExpenseCategory } from "../enums/expense-category.enum";

@Entity("expenses")
export class Expense {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number; // The total amount paid

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  vatAmount: number; // Stored separately if they are VAT registered

  @Column({ type: "date" })
  transactionDate: Date; // Crucial for MTD quarterly sorting

  @Column({
    type: "enum",
    enum: ExpenseCategory,
    default: ExpenseCategory.COST_OF_GOODS,
  })
  category: ExpenseCategory;

  @Column({ type: "varchar", length: 255, nullable: true })
  description: string; // e.g., "Timber from Travis Perkins"

  @Column({ type: "varchar", nullable: true })
  evidenceObjectKey: string; // MinIO/S3 key: e.g., "receipts/user-id/1234.jpg"

  @ManyToOne(() => User, (user) => user.expenses, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
