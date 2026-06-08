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

@Entity("incomes")
export class Income {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  vatAmount: number;

  @Column({ type: "date" })
  transactionDate: Date;

  @Column({ type: "varchar", length: 255 })
  source: string; // e.g., "Client: Mrs. Smith - Bathroom fit"

  @Column({ type: "varchar", nullable: true })
  evidenceObjectKey: string; // MinIO/S3 key for the outgoing invoice copy, if any

  @ManyToOne(() => User, (user) => user.incomes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
