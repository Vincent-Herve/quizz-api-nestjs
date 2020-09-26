import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizzRepository } from './quizz.repository';
import { Quizz } from './quizz.entity';

@Injectable()
export class QuizzService {
    constructor(
        @InjectRepository(QuizzRepository)
        private quizzRepository: QuizzRepository
    ) {}

    async getQuizzes(): Promise<Quizz[]> {
        const quizzes = await this.quizzRepository.find({ relations: ['tags', 'questions', 'questions.level', 'questions.answers', 'questions.answer'] });

        return quizzes;
    }
}
