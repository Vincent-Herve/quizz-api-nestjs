import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/fixtures/answer';
import { Level } from 'src/fixtures/level';
import { ANSWER } from 'src/fixtures/mock-answer';
import { LEVEL } from 'src/fixtures/mock-level';
import { QUESTION } from 'src/fixtures/mock-question';
import { QUIZZ } from 'src/fixtures/mock-quizz';
import { QUESTION_ANSWER, QUESTION_GOOD_ANSWER, QUESTION_LEVEL, QUIZZ_QUESTION, QUIZZ_TAG } from 'src/fixtures/mock-relation';
import { TAG } from 'src/fixtures/mock-tag';
import { Question } from 'src/fixtures/question';
import { Quizz } from 'src/fixtures/quizz';
import { Tag } from 'src/fixtures/tag';
import { AnswerRepository } from 'src/quizz/repository/answer.repository';
import { LevelRepository } from 'src/quizz/repository/level.repository';
import { QuestionRepository } from 'src/quizz/repository/question.repository';
import { QuizzRepository } from 'src/quizz/repository/quizz.repository';
import { TagRepository } from 'src/tag/repository/tag.repository';
import { getManager } from 'typeorm';

@Injectable()
export class CreateDataService implements OnModuleInit {
    private quizzes: Quizz[];
    private questions: Question[];
    private answers: Answer[];
    private levels: Level[];
    private tags: Tag[];

    constructor(
        @InjectRepository(QuizzRepository)
        private quizzRepository: QuizzRepository,
        @InjectRepository(QuestionRepository)
        private questionRepository: QuestionRepository,
        @InjectRepository(AnswerRepository)
        private answerRepository: AnswerRepository,
        @InjectRepository(LevelRepository)
        private levelRepository: LevelRepository,
        @InjectRepository(TagRepository)
        private tagRepository: TagRepository
    ) {}

    onModuleInit() {
        this.quizzes = QUIZZ;
        this.questions = QUESTION;
        this.answers = ANSWER;
        this.levels = LEVEL;
        this.tags = TAG;
    }

    async createData() {
        // Create Quizz
        console.log('CREATING QUIZZ');
        for (let quizz of this.quizzes) {
            this.quizzRepository.createQuizz(quizz);
        }
        // Create Question
        console.log('CREATING QUESTION');
        for (let question of this.questions) {
            await this.questionRepository.createQuestion(question);
        }
        // Create Answer
        console.log('CREATING ANSWER');
        for (let answer of this.answers) {
            let newAnswer = this.answerRepository.create(answer);
            await newAnswer.save();
        }
        // Create Level
        console.log('CREATING LEVEL');
        for (let level of this.levels) {
            let newLevel = this.levelRepository.create(level);
            await newLevel.save();
        }
        // Create Tag
        console.log('CREATING TAG');
        for (let tag of this.tags) {
            let newTag = this.tagRepository.create(tag);
            await newTag.save();
        }
        // Relations
        console.log('CREATING RELATIONS');
        const entityManager = getManager();
        entityManager.query(QUIZZ_TAG);
        for (let query of QUIZZ_QUESTION) entityManager.query(query);
        for (let query of QUESTION_LEVEL) entityManager.query(query);
        for (let query of QUESTION_GOOD_ANSWER) entityManager.query(query);
        for (let query of QUESTION_ANSWER) entityManager.query(query);
    }

    async cleanAll() {
        await this.quizzRepository.query('TRUNCATE TABLE quizz RESTART IDENTITY CASCADE');
        await this.questionRepository.query('TRUNCATE TABLE question RESTART IDENTITY CASCADE');
        await this.answerRepository.query('TRUNCATE TABLE answer RESTART IDENTITY CASCADE');
        await this.levelRepository.query('TRUNCATE TABLE level RESTART IDENTITY CASCADE');
        await this.tagRepository.query('TRUNCATE TABLE tag RESTART IDENTITY CASCADE');
    }

    async loadFixture() {
        console.log('** DELETING EXISTING DATA **');
        await this.cleanAll();
        console.log('** LOADING FIXTURES **');
        await this.createData();
        console.log('** FIXTURES LOADED SUCCESSFULLY **');
    }
}
