import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "../User/User.entity";

@Entity("incomes")
export class Income {
  @PrimaryGeneratedColumn({ type: "integer" })
  id!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "timestamp" })
  dateReceived: string;

  @Column({ type: "varchar", length: 255 })
  source: string;

  @Column({ type: "varchar" })
  paymentType: string;

  @Column({ type: "varchar", nullable: true })
  evidenceObjectKey: string;

  @ManyToOne(() => User, (user) => user.incomes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
