import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { IsEmail, IsNotEmpty, Length } from "class-validator";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    @Length(4, 20)
    username: string;

    @Column()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    @Length(8, 100)
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, 10)
        return hash === this.password;
    }
}