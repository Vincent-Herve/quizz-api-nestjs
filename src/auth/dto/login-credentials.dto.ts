import { IsString, Length, Matches } from "class-validator";

export class LoginCredentialsDto {
    @IsString()
    @Length(4, 20)
    username: string;

    @IsString()
    @Length(8, 100)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password too weak' })
    password: string;
}