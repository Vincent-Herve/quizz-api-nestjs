import { IsNotEmpty } from "class-validator";
import { CreateAnswerDto } from "./create-answer.dto";

export class CreateQuestionDto {
    @IsNotEmpty()
    question: string;
    
    @IsNotEmpty()
    anecdote: string;

    level: string;
    answers: CreateAnswerDto[];
    good_answer: CreateAnswerDto;
}