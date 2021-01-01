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
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

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
        const tables: string[] = ['quizz', 'question', 'answer', 'level', 'tag', 'public.user'];
        for (const table of tables) {
            await entityManager.query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);
        } 
    }

    async createData(data: any[]): Promise<void> {
        const entity = this.selectEntity(data);
        
        const repository = this.connection.getRepository(entity);
        for (const value of data) {
            const newData = repository.create(value);
            await repository.save(newData);
        }
    }

    selectEntity(data: any[]): EntityClassOrSchema {
        let entity: EntityClassOrSchema;
        data === QUIZZ ? entity = Quizz : null;
        data === QUESTION ? entity = Question : null;
        data === ANSWER ? entity = Answer : null;
        data === LEVEL ? entity = Level : null;
        data === TAG ? entity = Tag : null;
        data === USER ? entity = User : null;

        return entity;
    }

    async loadFixture(): Promise<void> {
        console.log('** DELETING EXISTING DATA **');
        await this.cleanAll();
        console.log('** LOADING FIXTURES **');
        await this.createAllData();
        console.log('** FIXTURES LOADED SUCCESSFULLY **');
    }
}
