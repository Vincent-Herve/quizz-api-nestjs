import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    answer: string;

    @Column({ default: true })
    status: boolean;

    @ManyToOne(() => Question, question => question.answers)
    question: Question;
}