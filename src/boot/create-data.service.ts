import { Injectable } from '@nestjs/common';
import { Connection, getManager } from 'typeorm';
import { ANSWER } from 'src/fixtures/mock-answer';
import { LEVEL } from 'src/fixtures/mock-level';
import { QUESTION } from 'src/fixtures/mock-question';
import { QUIZZ } from 'src/fixtures/mock-quizz';
import { TAG } from 'src/fixtures/mock-tag';
import { Quizz } from 'src/quizz/entity/quizz.entity';
import { Question } from 'src/quizz/entity/question.entity';
import { Answer } from 'src/quizz/entity/answer.entity';
import { Level } from 'src/quizz/entity/level.entity';
import { Tag } from 'src/tag/entity/tag.entity';
import { USER } from 'src/fixtures/mock-user';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class CreateDataService {
    constructor(
        private connection: Connection
    ) {}

    async createAllData(): Promise<void> {
        // Create Quizz
        console.log('CREATING QUIZZ');
        this.createData(QUIZZ);
        // Create Question
        console.log('CREATING QUESTION');
        this.createData(QUESTION);
        // Create Answer
        console.log('CREATING ANSWER');
        this.createData(ANSWER);
        // Create Level
        console.log('CREATING LEVEL');
        this.createData(LEVEL);
        // Create Tag
        console.log('CREATING TAG');
        this.createData(TAG);
        // Create User
        console.log('CREATING USER');
        this.createData(USER);
        // Relations
        /* console.log('CREATING RELATIONS');
        const entityManager = getManager();
        entityManager.query(QUIZZ_TAG);
        for (const query of QUIZZ_QUESTION) entityManager.query(query);
        for (const query of QUESTION_LEVEL) entityManager.query(query);
        for (const query of QUESTION_GOOD_ANSWER) entityManager.query(query);
        for (const query of QUESTION_ANSWER) entityManager.query(query); */
    }

    async cleanAll(): Promise<void> {
        const entityManager = getManager();
        await entityManager.query('TRUNCATE TABLE quizz RESTART IDENTITY CASCADE');
        await entityManager.query('TRUNCATE TABLE question RESTART IDENTITY CASCADE');
        await entityManager.query('TRUNCATE TABLE answer RESTART IDENTITY CASCADE');
        await entityManager.query('TRUNCATE TABLE level RESTART IDENTITY CASCADE');
        await entityManager.query('TRUNCATE TABLE tag RESTART IDENTITY CASCADE');
        await entityManager.query('TRUNCATE TABLE public.user RESTART IDENTITY CASCADE');
    }

    async loadFixture(): Promise<void> {
        console.log('** DELETING EXISTING DATA **');
        await this.cleanAll();
        console.log('** LOADING FIXTURES **');
        await this.createAllData();
        console.log('** FIXTURES LOADED SUCCESSFULLY **');
    }

    async createData(data) {
        const dataEntity = this.selectRepository(data);
        
        const repository = this.connection.getRepository(dataEntity);
        for (const value of data) {
            const newData = repository.create(value);
            await repository.save(newData);
        }
    }

    selectRepository(data) {
        let repository;
        data === QUIZZ ? repository = Quizz : null;
        data === QUESTION ? repository = Question : null;
        data === ANSWER ? repository = Answer : null;
        data === LEVEL ? repository = Level : null;
        data === TAG ? repository = Tag : null;
        data === USER ? repository = User : null;

        return repository;
    }
}
