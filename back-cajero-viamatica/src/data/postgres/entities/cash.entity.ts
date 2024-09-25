import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Turn } from "./turn.entity";

@Entity()
export class Cash {
  @PrimaryGeneratedColumn("uuid")
  cashid: string;

  @Column({ length: 50 })
  cashdescription: string;

  @Column({ default: true })
  active: boolean;

  /**
   * -
   */
  @OneToMany(() => Turn, (turn) => turn.cash)
  turns: Turn[];
}
