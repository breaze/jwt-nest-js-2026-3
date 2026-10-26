import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleEntity } from "./role.entity.js";

@Entity('usuario')
export class UserEntity {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'username' })
    username: string;

    @Column({ name: 'password' })
    password: string;

    @Column({ name: 'activo' })
    active: boolean;

    @Column({ name: 'created_at' })
    createdAt: Date;

    @ManyToMany(() => RoleEntity)
    @JoinTable({
        name: 'usuario_rol',
        joinColumn: { name: 'usuario_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'rol_id', referencedColumnName: 'id' },
    })
    roles: RoleEntity[];
}