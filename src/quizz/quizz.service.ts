import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizzRepository } from './repository/quizz.repository';
import { Quizz } from './entities/quizz.entity';
import { UpdateQuizzDto } from './dto/update-quizz.dto';
import { CreateQuizzDto } from './dto/create-quizz.dto';

@Injectable()
export class QuizzService {
    constructor(
        @InjectRepository(QuizzRepository)
        private quizzRepository: QuizzRepository
    ) {}

    async getQuizzes(): Promise<Quizz[]> {
        const quizzes = await this.quizzRepository.find({ relations: ['tags', 'questions', 'questions.level', 'questions.answers', 'questions.good_answer'] });

        return quizzes;
    }

    async getQuizzById(id: string): Promise<Quizz> {
        const found = await this.quizzRepository.findOne(id, { relations: ['tags', 'questions', 'questions.level', 'questions.answers', 'questions.good_answer'] });

        if (!found) {
            throw new NotFoundException(`Quizz with "${id}" not found`);
        }

        return found;
    }

    async createQuizz(createQuizzDto: CreateQuizzDto): Promise<Quizz> {
        return this.quizzRepository.createQuizz(createQuizzDto);
    }

    async updateQuizz(id: string, updateQuizzDto: UpdateQuizzDto): Promise<Quizz> {
        const quizz = await this.getQuizzById(id);
        return this.quizzRepository.updateQuizz(quizz, updateQuizzDto);
    }

    async deleteQuizz(id: string): Promise<void> {
        const result = await this.quizzRepository.delete(id);

        if (result.affected === 0) throw new NotFoundException(`Quizz with "${id}" not found`);
    } 
}
