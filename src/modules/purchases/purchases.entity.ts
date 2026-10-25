import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Purchases {
    @PrimaryGeneratedColumn({ name: 'purchase_id' })
    purchaseId: number;

    @Column({ name: 'account_id' })
    accountId: number;

    @Column({ name: 'description'})
    description: string;

    @Column({ name: 'amount'})
    amount: number;

    @Column({ name: 'purchase_date'})
    purchaseDate: Date;
}
