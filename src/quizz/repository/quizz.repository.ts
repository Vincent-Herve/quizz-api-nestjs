import { Repository, EntityRepository, getManager } from "typeorm";
import { Quizz } from '../entity/quizz.entity';
import { CreateQuizzDto } from '../dto/create-quizz.dto';
import { UpdateQuizzDto } from '../dto/update-quizz.dto';
import { Tag } from '../../tag/entity/tag.entity';

@EntityRepository(Quizz)
export class QuizzRepository extends Repository<Quizz> {
    async createQuizz({ title, description, tags }: CreateQuizzDto): Promise<Quizz> {
        // const { title, description } = createQuizzDto;
        const entityManager = getManager();
        const addTagToQuizz = [];
        const quizz = new Quizz();
        quizz.title = title;
        quizz.description = description;
        for (const tag of tags) {
            const foundTag = await entityManager.findOne(Tag, { name: tag });
            addTagToQuizz.push(foundTag);
        }
        quizz.tags = addTagToQuizz;
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