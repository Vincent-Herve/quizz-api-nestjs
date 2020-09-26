import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Question } from './question.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class Quizz extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: true })
    status: boolean;

    @OneToMany(type => Question, question => question.quizz)
    questions: Question[];

    @ManyToMany(type => Tag)
    @JoinTable()
    tags: Tag[];
}