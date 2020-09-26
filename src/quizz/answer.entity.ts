import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    answer: string;

    @Column({ default: true })
    status: boolean;

    @ManyToOne(type => Question, question => question.answers)
    question: Question;
}