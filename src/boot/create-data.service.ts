import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QUESTION } from 'src/fixtures/mock-question';
import { Question } from 'src/fixtures/question';
import { AnswerRepository } from 'src/quizz/repository/answer.repository';
import { LevelRepository } from 'src/quizz/repository/level.repository';
import { QuestionRepository } from 'src/quizz/repository/question.repository';
import { QuizzRepository } from 'src/quizz/repository/quizz.repository';
import { TagRepository } from 'src/tag/repository/tag.repository';

@Injectable()
export class CreateDataService implements OnModuleInit {
    private questions: Question[];

    constructor(
        @InjectRepository(QuizzRepository)
        private quizzRepository: QuizzRepository,
        @InjectRepository(QuestionRepository)
        private questionRepository: QuestionRepository,
        @InjectRepository(QuizzRepository)
        private answerRepository: AnswerRepository,
        @InjectRepository(QuestionRepository)
        private levelRepository: LevelRepository,
        @InjectRepository(TagRepository)
        private tagRepository: TagRepository
    ) {}

    onModuleInit() {
        this.questions = QUESTION;    }

    async createData() {
        // Create Quizz
        const quizz1 = await this.quizzRepository.create({ title: 'Linux - I', description: 'Non, ce n\'est pas un pingouin!' });
        await quizz1.save();
        const quizz2 = await this.quizzRepository.create({ title: 'Linux - II', description: 'Non, ce n\'est pas un pingouin!' });
        await quizz2.save();

        // Create Question
        /* for (let question of this.questions) {
            let newQuestion = await this.questionRepository.create(question);
            await newQuestion.save();
        } */
        // Create Answer

        // Create Level

        // Create Tag

        // Relations
    }

    async cleanAll() {
        await this.quizzRepository.query('DELETE FROM quizz');
        await this.questionRepository.query('DELETE FROM question');
        await this.answerRepository.query('DELETE FROM answer');
        await this.levelRepository.query('DELETE FROM level');
        await this.tagRepository.query('DELETE FROM tag');
    }

    async loadFixture() {
        console.log('** DELETING EXISTING DATA **');
        await this.cleanAll();
        console.log('** LOADING FIXTURES **');



        console.log('** FIXTURES LOADED SUCCESSFULLY **');
    }
}
