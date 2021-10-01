import { Exclude } from 'class-transformer';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 80 })
  name: string;

  @Column({ length: 80 })
  email: string;

  @Column({ default: false })
  @Exclude()
  email_confirmed: boolean;

  @Column()
  @Exclude()
  password_hash: string;

  @Column()
  @Exclude()
  security_stamp: string;

  @Column({ default: false })
  @Exclude()
  two_factor_enabled: boolean;

  @Column({ default: false })
  @Exclude()
  lockout_enabled: boolean;

  @Column()
  @Exclude()
  lockout_expires: Date;

  @Column({ default: true })
  enabled: boolean;

  @Column({ default: 0 })
  @Exclude()
  access_failed_count: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export { User };
