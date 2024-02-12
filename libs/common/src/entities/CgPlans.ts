import { Column, Entity,Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CgUsers } from "./CgUsers";
import { CgSubscriptions } from "./CgSubscriptions";

@Index("cg_plans_user_id_foreign", ["userId"], {})
@Index("cg_plans_currency_id_foreign", ["currencyId"], {})
@Entity("cg_plans", { schema: "member_sms1click" })
export class CgPlans{
    @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
  id: number;

  @Column("char", { name: "uid", length: 36 })
  uid: string;

  @Column("bigint", { name: "user_id", nullable: true, unsigned: true })
  userId: string | null;

  @Column("bigint", { name: "currency_id", unsigned: true })
  currencyId: string;
  
  @Column("varchar", { name: "name", length: 191 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("decimal", { name: "price", precision: 16, scale: 2 })
  price: string;

  @Column("varchar", { name: "billing_cycle", length: 50 })
  billingCycle: string;

  @Column("int", { name: "frequency_amount" })
  frequencyAmount: number;

  @Column("varchar", { name: "frequency_unit", length: 5 })
  frequencyUnit: string;

  @Column("text", { name: "options" })
  options: string;

  @Column("tinyint", { name: "status", width: 1, default: () => "'1'" })
  status: boolean;

  @Column("int", { name: "custom_order" })
  customOrder: number;

  @Column("tinyint", { name: "is_default", width: 1, default: () => "'0'" })
  isDefault: boolean;

  @Column("tinyint", { name: "is_popular", width: 1, default: () => "'0'" })
  isPopular: boolean;

  @Column("tinyint", {
    name: "tax_billing_required",
    width: 1,
    default: () => "'0'",
  })
  taxBillingRequired: boolean;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("tinyint", {
    name: "show_in_customer",
    width: 1,
    default: () => "'1'",
  })
  showInCustomer: boolean;

  @ManyToOne(() => CgUsers, (cgUsers) => cgUsers.cgPlans, {
    onDelete: "CASCADE",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: CgUsers;

  @OneToMany(() => CgSubscriptions, (cgSubscriptions) => cgSubscriptions.plan)
  cgSubscriptions: CgSubscriptions[];
}