import {
    Column,
    Entity,
    Generated,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from "typeorm";

  import { CgUsers } from "./CgUsers";
  
  @Index("cg_customers_user_id_foreign", ["userId"], {})
  @Index("cg_customers_contact_id_foreign", ["contactId"], {})
  @Entity("cg_customers", { schema: "member_sms1click" })
  export class CgCustomers {
    @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
    id: number;
  
    @Generated('uuid')
    @Column("char", { name: "uid", length: 36 })
    uid: string;
  
    @Column("bigint", { name: "user_id", unsigned: true })
    userId: number;
  
    @Column("bigint", { name: "contact_id", nullable: true, unsigned: true })
    contactId: string | null;
  
    @Column("bigint", { name: "parent", nullable: true, unsigned: true })
    parent: string | null;
  
    @Column("text", { name: "company", nullable: true })
    company: string | null;
  
    @Column("text", { name: "website", nullable: true })
    website: string | null;
  
    @Column("varchar", { name: "address", nullable: true, length: 191 })
    address: string | null;
  
    @Column("varchar", { name: "city", nullable: true, length: 191 })
    city: string | null;
  
    @Column("varchar", { name: "postcode", nullable: true, length: 191 })
    postcode: string | null;
  
    @Column("varchar", { name: "financial_address", nullable: true, length: 191 })
    financialAddress: string | null;
  
    @Column("varchar", { name: "financial_city", nullable: true, length: 191 })
    financialCity: string | null;
  
    @Column("varchar", {
      name: "financial_postcode",
      nullable: true,
      length: 191,
    })
    financialPostcode: string | null;
  
    @Column("varchar", { name: "tax_number", nullable: true, length: 191 })
    taxNumber: string | null;
  
    @Column("varchar", { name: "state", nullable: true, length: 191 })
    state: string | null;
  
    @Column("varchar", { name: "country", nullable: true, length: 191 })
    country: string | null;
  
    @Column("varchar", { name: "phone", nullable: true, length: 30 })
    phone: string | null;
  
    @Column("text", { name: "notifications", nullable: true })
    notifications: string | null;
  
    @Column("text", { name: "permissions", nullable: true })
    permissions: string | null;
  
    @Column("timestamp", { name: "created_at", nullable: true })
    createdAt: Date | null;
  
    @Column("timestamp", { name: "updated_at", nullable: true })
    updatedAt: Date | null;

    @ManyToOne(() => CgUsers, (cgUsers) => cgUsers.cgCustomers, {
      onDelete: "CASCADE",
      onUpdate: "RESTRICT",
    })
    
    @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: CgUsers;
  }
  