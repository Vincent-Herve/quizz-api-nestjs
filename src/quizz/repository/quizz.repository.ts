import { Repository, EntityRepository } from "typeorm";
import { Quizz } from '../entity/quizz.entity';
import { CreateQuizzDto } from '../dto/create-quizz.dto';
import { UpdateQuizzDto } from '../dto/update-quizz.dto';

@EntityRepository(Quizz)
export class QuizzRepository extends Repository<Quizz> {
    async createQuizz(createQuizzDto: CreateQuizzDto): Promise<Quizz> {
        const { title, description } = createQuizzDto;

        const quizz = new Quizz();
        quizz.title = title;
        quizz.description = description;
        await quizz.save();

        return quizz;
    }

    async updateQuizz(quizz: Quizz, updateQuizzDto: UpdateQuizzDto): Promise<Quizz> {
        const { title, description } = updateQuizzDto;

        if (title !== "") quizz.title = title;
        if (description !== "") quizz.description = description;
        await quizz.save();
        return quizz;
    }
}