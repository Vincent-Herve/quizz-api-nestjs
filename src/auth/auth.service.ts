import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../user/repository/user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    /* async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    } */

    /* async login(authCredentialsDto: AuthCredentialsDto): Promise<{ access_token: string }> {
        const payload: JwtPayload = await this.userRepository.validateUserPassword(authCredentialsDto);

        if (!payload) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const access_token = await this.jwtService.sign(payload);
        return { access_token };
    } */
}
