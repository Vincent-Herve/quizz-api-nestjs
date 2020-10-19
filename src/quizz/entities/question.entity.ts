import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Quizz } from './quizz.entity';
import { Level } from './level.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    question: string;

    @Column()
    anecdote: string;

    @Column({ default: true })
    status: boolean;

    @OneToOne(type => Answer)
    @JoinColumn({ name: "good_answer" })
    good_answer: Answer;

    @OneToMany(type => Answer, answer => answer.question)
    answers: Answer[];

    @ManyToOne(type => Quizz, quizz => quizz.questions)
    quizz: Quizz;

    @ManyToOne(type => Level, level => level.questions)
    level: Level;
}