import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { People } from "../people/people.entity.js";

@Entity('accounts')
export class Account {
    @PrimaryGeneratedColumn({ name: 'account_id' })
    accountId: number;

    @Column({ name: 'person_id'})
    personId: number;

    @Column({ name: 'balance'})
    balance: number;
}
