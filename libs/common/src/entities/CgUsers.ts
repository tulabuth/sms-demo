import {
  Column,
  Entity,
  Generated,
  Index,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VerifyType } from '../enum/Verify';
import { Exclude } from 'class-transformer';
import { CgCustomers } from './CgCustomers';
import { CgPlans } from './CgPlans';
import { CgSubscriptions } from './CgSubscriptions';

@Index('cg_users_email_unique', ['email'], { unique: true })
@Entity('cg_users', { schema: 'member_sms1click' })
export class CgUsers {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id', unsigned: true })
  id: number;

  @Generated('uuid')
  @Column('char', { name: 'uid', length: 36 })
  uid: string;

  @Column('varchar', { name: 'api_token', nullable: true, length: 191 })
  apiToken: string | null;

  @Column('varchar', { name: 'first_name', length: 191 })
  firstName: string;

  @Column('varchar', { name: 'last_name', nullable: true, length: 191 })
  lastName: string | null;

  @Column('varchar', { name: 'email', unique: true, length: 191 })
  email: string;

  @Column('timestamp', { name: 'email_verified_at', nullable: true })
  emailVerifiedAt: Date | null;

  @Exclude()
  @Column('varchar', { name: 'password', nullable: true, length: 191 })
  password: string | null;

  @Column('tinyint', { name: 'status', width: 1, default: () => "'1'" })
  status: boolean;

  @Column('text', { name: 'image', nullable: true })
  image: string | null;

  @Column('varchar', { name: 'sms_unit', nullable: true, length: 191 })
  smsUnit: string | null;

  @Column('tinyint', { name: 'is_admin', width: 1, default: () => "'0'" })
  isAdmin: boolean;

  @Column('tinyint', { name: 'is_customer', width: 1, default: () => "'0'" })
  isCustomer: boolean;

  @Column('varchar', { name: 'active_portal', nullable: true, length: 191 })
  activePortal: string | null;

  @Column('tinyint', { name: 'two_factor', width: 1, default: () => "'0'" })
  twoFactor: boolean;

  @Column('int', { name: 'two_factor_code', nullable: true })
  twoFactorCode: boolean | null;

  @Column('datetime', { name: 'two_factor_expires_at', nullable: true })
  twoFactorExpiresAt: Date | null;

  @Column('varchar', {
    name: 'two_factor_backup_code',
    nullable: true,
    length: 191,
  })
  twoFactorBackupCode: string | null;

  @Column('varchar', { name: 'locale', length: 191 })
  locale: string;


  @Column('timestamp', { name: 'last_access_at', nullable: true })
  lastAccessAt: Date | null;

  @Column('varchar', { name: 'provider', nullable: true, length: 191 })
  provider: string | null;

  @Column('varchar', { name: 'provider_id', nullable: true, length: 191 })
  providerId: string | null;

  @Column('varchar', { name: 'remember_token', nullable: true, length: 100 })
  rememberToken: string | null;

  @Column('timestamp', { name: 'created_at', nullable: true })
  createdAt: Date | null;

  @Column('timestamp', { name: 'updated_at', nullable: true })
  updatedAt: Date | null;

  @Column('bigint', {
    name: 'api_sending_server',
    nullable: true,
    unsigned: true,
  })
  apiSendingServer: string | null;

  @Column('enum', {
    name: 'type',
    enum: VerifyType,
  })
  type: string;

  @OneToMany(() => CgCustomers, (cgCustomers) => cgCustomers.user)
  cgCustomers: CgCustomers[];

  @OneToMany(()=>CgPlans, (cgPlans)=>cgPlans.user)
  cgPlans: CgPlans[];

  @OneToMany(() => CgSubscriptions, (cgSubscriptions) => cgSubscriptions.endBy2)
  cgSubscriptions: CgSubscriptions[];

  @OneToMany(() => CgSubscriptions, (cgSubscriptions) => cgSubscriptions.user)
  cgSubscriptions2: CgSubscriptions[];
}
