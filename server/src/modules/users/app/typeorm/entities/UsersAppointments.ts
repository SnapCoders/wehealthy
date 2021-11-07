import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Appointments } from '@modules/appointment/app/typeorm/entities/Appointments';
import { User } from '@modules/users/app/typeorm/entities/User';

@Entity('users_appointments')
class UsersAppointments extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(_type => User, user => user)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @OneToMany(_type => Appointments, appointment => appointment)
  @JoinColumn({ name: 'appointment_id' })
  appointment?: Appointments;

  @Column()
  user_id: string;

  @Column()
  appointment_id: string;

  @CreateDateColumn()
  associated_at: Date;
}

export { UsersAppointments };
