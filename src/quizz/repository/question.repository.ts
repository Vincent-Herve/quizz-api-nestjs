import { Repository, EntityRepository } from "typeorm";
import { Question } from "../entity/question.entity";
import { CreateQuestionDto } from "../dto/create-question.dto"

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
    async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question>{
        const { question, anecdote } = createQuestionDto;

        const newQuestion = new Question();
        newQuestion.question = question;
        newQuestion.anecdote = anecdote;
        await newQuestion.save();

        return newQuestion;
    }
}