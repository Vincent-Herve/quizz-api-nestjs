import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/signup')
    async signUp(@Body() signupCredentialsDto: SignupCredentialsDto): Promise<void> {
        return this.authService.signUp(signupCredentialsDto);
    }

    @Post('/login')
    async login(@Body() loginCredentialsDto: LoginCredentialsDto): Promise<{ access_token: string }> {
        return this.authService.login(loginCredentialsDto);
    }
}
