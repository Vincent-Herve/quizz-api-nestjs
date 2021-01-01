import { IsNotEmpty } from "class-validator";
import { CreateQuestionDto } from './create-question.dto';

export class CreateQuizzDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    description: string;

    questions: CreateQuestionDto[];
    tags: string[];
}