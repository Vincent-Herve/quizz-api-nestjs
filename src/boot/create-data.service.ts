import { Injectable } from '@nestjs/common';
import { Connection, getManager } from 'typeorm';
import { ANSWER } from 'src/fixtures/mock-answer';
import { LEVEL } from 'src/fixtures/mock-level';
import { QUESTION } from 'src/fixtures/mock-question';
import { QUIZZ } from 'src/fixtures/mock-quizz';
import { QUESTION_ANSWER, QUESTION_GOOD_ANSWER, QUESTION_LEVEL, QUIZZ_QUESTION, QUIZZ_TAG } from 'src/fixtures/mock-relation';
import { TAG } from 'src/fixtures/mock-tag';
import { Quizz } from 'src/quizz/entities/quizz.entity';
import { Question } from 'src/quizz/entities/question.entity';
import { Answer } from 'src/quizz/entities/answer.entity';
import { Level } from 'src/quizz/entities/level.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class CreateDataService {
    constructor(
        private connection: Connection
    ) {}

    async createData(): Promise<void> {
        // Create Quizz
        console.log('CREATING QUIZZ');
        for (const quizz of QUIZZ) {
            const newQuizz = this.connection.getRepository(Quizz).create(quizz);
            await this.connection.getRepository(Quizz).save(newQuizz)
        }
        // Create Question
        console.log('CREATING QUESTION');
        for (const question of QUESTION) {
            const newQuestion = this.connection.getRepository(Question).create(question);
            await this.connection.getRepository(Question).save(newQuestion)
        }
        // Create Answer
        console.log('CREATING ANSWER');
        for (const answer of ANSWER) {
            const newAnswer = this.connection.getRepository(Answer).create(answer);
            await this.connection.getRepository(Answer).save(newAnswer)
        }
        // Create Level
        console.log('CREATING LEVEL');
        for (const level of LEVEL) {
            const newLevel = this.connection.getRepository(Level).create(level);
            await this.connection.getRepository(Level).save(newLevel)
        }
        // Create Tag
        console.log('CREATING TAG');
        for (const tag of TAG) {
            const newTag = this.connection.getRepository(Tag).create(tag);
            await this.connection.getRepository(Tag).save(newTag)
        }
        // Relations
        console.log('CREATING RELATIONS');
        const entityManager = getManager();
        entityManager.query(QUIZZ_TAG);
        for (const query of QUIZZ_QUESTION) entityManager.query(query);
        for (const query of QUESTION_LEVEL) entityManager.query(query);
        for (const query of QUESTION_GOOD_ANSWER) entityManager.query(query);
        for (const query of QUESTION_ANSWER) entityManager.query(query);
    }

    async cleanAll(): Promise<void> {
        const entityManager = getManager();
        await entityManager.query('TRUNCATE TABLE quizz RESTART IDENTITY CASCADE');
        await entityManager.query('TRUNCATE TABLE question RESTART IDENTITY CASCADE');
        await entityManager.query('TRUNCATE TABLE answer RESTART IDENTITY CASCADE');
        await entityManager.query('TRUNCATE TABLE level RESTART IDENTITY CASCADE');
        await entityManager.query('TRUNCATE TABLE tag RESTART IDENTITY CASCADE');
    }

    async loadFixture(): Promise<void> {
        console.log('** DELETING EXISTING DATA **');
        await this.cleanAll();
        console.log('** LOADING FIXTURES **');
        await this.createData();
        console.log('** FIXTURES LOADED SUCCESSFULLY **');
    }
}
