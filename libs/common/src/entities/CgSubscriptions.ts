import {
    Column,
    Entity,
    Generated,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";

  import { CgUsers } from "./CgUsers";
  import { CgPlans } from "./CgPlans";
  
  @Index("cg_subscriptions_user_id_foreign", ["userId"], {})
  @Index("cg_subscriptions_end_by_foreign", ["endBy"], {})
  @Index("cg_subscriptions_plan_id_foreign", ["planId"], {})
  @Index("cg_subscriptions_payment_method_id_foreign", ["paymentMethodId"], {})
  @Entity("cg_subscriptions", { schema: "member_sms1click" })
  export class CgSubscriptions {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
    id: number;
  
    @Generated('uuid')
    @Column("char", { name: "uid", length: 36 })
    uid: string;
  
    @Column("bigint", { name: "user_id", unsigned: true })
    userId: string;
  
    @Column("bigint", { name: "plan_id", unsigned: true })
    planId: string;
  
    @Column("bigint", {
      name: "payment_method_id",
      nullable: true,
      unsigned: true,
    })
    paymentMethodId: string | null;
  
    @Column("text", { name: "options", nullable: true })
    options: string | null;
  
    @Column("tinyint", { name: "paid", width: 1, default: () => "'0'" })
    paid: boolean;
  
    @Column("tinyint", {
      name: "payment_claimed",
      width: 1,
      default: () => "'0'",
    })
    paymentClaimed: boolean;
  
    @Column("timestamp", { name: "current_period_ends_at", nullable: true })
    currentPeriodEndsAt: Date | null;
  
    @Column("datetime", { name: "start_at", nullable: true })
    startAt: Date | null;
  
    @Column("datetime", { name: "end_at", nullable: true })
    endAt: Date | null;
  
    @Column("bigint", { name: "end_by", nullable: true, unsigned: true })
    endBy: string | null;
  
    @Column("int", { name: "end_period_last_days", default: () => "'10'" })
    endPeriodLastDays: number;
  
    @Column("timestamp", { name: "created_at", nullable: true })
    createdAt: Date | null;
  
    @Column("timestamp", { name: "updated_at", nullable: true })
    updatedAt: Date | null;
  
  
    @ManyToOne(() => CgUsers, (cgUsers) => cgUsers.cgSubscriptions, {
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "end_by", referencedColumnName: "id" }])
    endBy2: CgUsers;
  
  
    @ManyToOne(() => CgPlans, (cgPlans) => cgPlans.cgSubscriptions, {
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "plan_id", referencedColumnName: "id" }])
    plan: CgPlans;
  
    @ManyToOne(() => CgUsers, (cgUsers) => cgUsers.cgSubscriptions2, {
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: CgUsers;
  }
  