import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { User } from '../entity/user.entity';
import { SignupCredentialsDto } from '../../auth/dto/signup-credentials.dto';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { LoginCredentialsDto } from "src/auth/dto/login-credentials.dto";
import { JwtPayload } from "src/auth/jwt-payload.interface";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(signupCredentialsDto: SignupCredentialsDto): Promise<void> {
        const { username, email, password } = signupCredentialsDto;

        const user = new User();
        user.username = username;
        user.email = email
        user.password = await this.hashPassword(password);

        try {
            await user.save();
        }
        catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(
        loginCredentialsDto: LoginCredentialsDto
    ): Promise<JwtPayload> {
        
        const { username, password } = loginCredentialsDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password)) {
            const { username, id } = user;
            return {
                username,
                sub: id
            }
        }
        return null;
    }

    async validateAdminUserPassword(
        loginCredentialsDto: LoginCredentialsDto
    ): Promise<JwtPayload> {
        
        const { username, password } = loginCredentialsDto;
        const user = await this.findOne({ username });

        if (user && await user.validatePassword(password) && user.role === 'admin') {
            const { username, id } = user;
            return {
                username,
                sub: id
            }
        }
        return null;
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
}