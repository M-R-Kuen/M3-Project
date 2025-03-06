import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { Users } from "./UsersE";

@Entity({ name: "appointments" })
export class Appointments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  status: string;

  @ManyToOne(() => Users, (users) => users.appointments)
  user: Users;
}

export enum Status {
  completed = "active",
  cancelled = "cancelled",
}
