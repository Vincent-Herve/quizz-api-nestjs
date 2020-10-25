import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Quizz } from './quizz.entity';
import { Level } from './level.entity';
import { Answer } from './answer.entity';

@Entity()
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    question: string;

    @Column()
    anecdote: string;

    @Column({ default: true })
    status: boolean;

    @OneToOne(() => Answer)
    @JoinColumn({ name: "good_answer" })
    good_answer: Answer;

    @OneToMany(() => Answer, answer => answer.question)
    answers: Answer[];

    @ManyToOne(() => Quizz, quizz => quizz.questions)
    quizz: Quizz;

    @ManyToOne(() => Level, level => level.questions)
    level: Level;
}