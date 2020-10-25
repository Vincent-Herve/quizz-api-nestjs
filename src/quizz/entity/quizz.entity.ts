import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Question } from './question.entity';
import { Tag } from '../../tag/entities/tag.entity';

@Entity()
export class Quizz extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: true })
    status: boolean;

    @OneToMany(() => Question, question => question.quizz)
    questions: Question[];

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];
}