import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('rol')
export class RoleEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'nombre' })
    name: string;
}