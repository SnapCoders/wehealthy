import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { User } from '@modules/users/app/typeorm/entities/User';

@Entity('appointments')
class Appointments extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(_type => User, user => user)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(_type => User, user => user)
  @JoinColumn({ name: 'nutritionist_id' })
  nutritionist: User;

  @Column()
  user_id: string;

  @Column()
  nutritionist_id: string;

  @Column()
  date: Date;

  @Column({ length: 80 })
  type: string;

  @Column()
  link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export { Appointments };
