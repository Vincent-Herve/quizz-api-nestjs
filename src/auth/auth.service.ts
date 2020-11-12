import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/repository/user.repository';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signUp(signupCredentialsDto: SignupCredentialsDto): Promise<void> {
        return this.userRepository.signUp(signupCredentialsDto);
    }

    async login(loginCredentialsDto: LoginCredentialsDto): Promise<{ access_token: string }> {
        const payload: JwtPayload = await this.userRepository.validateUserPassword(loginCredentialsDto);

        if (!payload) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const access_token = await this.jwtService.sign(payload);
        return { access_token };
    }
}
