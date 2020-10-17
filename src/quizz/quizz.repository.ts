import { Repository, EntityRepository } from "typeorm";
import { Quizz } from './entities/quizz.entity';
import { QuizzDto } from './dto/quizz.dto';

@EntityRepository(Quizz)
export class QuizzRepository extends Repository<Quizz> {
    async createQuizz(quizzDto: QuizzDto): Promise<Quizz> {
        const { title, description } = quizzDto;

        const quizz = new Quizz();
        quizz.title = title;
        quizz.description = description;
        await quizz.save();

        return quizz;
    }
}