import { Repository, EntityRepository, getManager } from "typeorm";
import { Question } from '../entity/question.entity';
import { CreateQuestionDto } from "../dto/create-question.dto";
import { Level } from '../entity/level.entity';
import { Answer } from '../entity/answer.entity';
import { Quizz } from '../entity/quizz.entity';

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {
    async createQuestion(createQuestionDto: CreateQuestionDto): Promise<Question> {
        const { question, anecdote } = createQuestionDto;

        const newQuestion = new Question();
        newQuestion.question = question;
        newQuestion.anecdote = anecdote;
        await newQuestion.save();

        return newQuestion;
    }

    async createAllQuestions(questions: CreateQuestionDto[], newQuizz: Quizz): Promise<void> {
        const entityManager = getManager();
        for (const questionValue of questions) {
            const level = await entityManager.findOne(Level, { name: questionValue.level });
            const newQuestion = new Question();
            newQuestion.question = questionValue.question;
            newQuestion.anecdote = questionValue.anecdote;
            newQuestion.quizz = newQuizz;
            newQuestion.level = level;
            await newQuestion.save();

            for (const answerValue of questionValue.answers) {
                const newAnswer = new Answer();
                newAnswer.answer = answerValue.answer;
                newAnswer.question = newQuestion;
                await newAnswer.save();
                const goodAnswer = questionValue.good_answer.answer;

                if (goodAnswer === answerValue.answer) {
                    newQuestion.good_answer = newAnswer;
                    await newQuestion.save();
                }
            }
        }
    }
}