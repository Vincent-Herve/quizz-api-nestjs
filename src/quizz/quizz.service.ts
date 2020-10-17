import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QuizzRepository } from './quizz.repository';
import { Quizz } from './entities/quizz.entity';
import { QuizzDto } from './dto/quizz.dto';

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

    async getQuizzById(id: number): Promise<Quizz> {
        const found = await this.quizzRepository.findOne(id, { relations: ['tags', 'questions', 'questions.level', 'questions.answers', 'questions.answer'] });

        if (!found) {
            throw new NotFoundException(`Quizz with "${id}" not found`);
        }

        return found;
    }

    async createQuizz(quizzDto: QuizzDto): Promise<Quizz> {
        return this.quizzRepository.createQuizz(quizzDto);
    }

    async updateQuizz(id: number, quizzDto: QuizzDto): Promise<Quizz> {
        const quizz = await this.getQuizzById(id);
        const { title, description } = quizzDto;

        if (title !== "") quizz.title = title;
        if (description !== "") quizz.description = description;
        await quizz.save();
        return quizz;
    }

    async deleteQuizz(id: number): Promise<void> {
        const result = await this.quizzRepository.delete(id);

        if (result.affected === 0) throw new NotFoundException(`Quizz with "${id}" not found`);
    } 
}
