import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    private logger = new Logger('AuthController');

    constructor(private authService: AuthService) {}
    
    @Post('/signup')
    async signUp(@Body() signupCredentialsDto: SignupCredentialsDto): Promise<void> {
        this.logger.verbose(`User Signup`);
        return this.authService.signUp(signupCredentialsDto);
    }

    @Post('/login')
    async login(@Body() loginCredentialsDto: LoginCredentialsDto): Promise<{ access_token: string }> {
        this.logger.verbose(`User Login`);
        return this.authService.login(loginCredentialsDto);
    }
}
