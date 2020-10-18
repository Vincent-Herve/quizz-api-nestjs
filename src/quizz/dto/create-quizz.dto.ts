import { IsNotEmpty } from "class-validator";

export class CreateQuizzDto {
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    description: string;
}