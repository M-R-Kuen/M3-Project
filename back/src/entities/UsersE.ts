import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Credentials } from "./CredentialsE";
import { Appointments } from "./AppointmentsE";

@Entity({ name: "users" })
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  birthdate: Date;

  @Column()
  nId: number;

  @Column({ nullable: true })
  profileImg: string;

  @OneToMany(() => Appointments, (appointment) => appointment.user)
  appointments: Appointments[];

  @OneToOne(() => Credentials)
  @JoinColumn()
  credentialsId: Credentials;
}
