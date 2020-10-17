import { IsNotEmpty } from "class-validator";

export class QuizzDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    status: boolean;
}