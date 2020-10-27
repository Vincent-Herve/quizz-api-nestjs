import { Body, Controller, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { SignupCredentialsDto } from './dto/signup-credentials.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

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

    @UseGuards(AuthGuard(), RolesGuard)
    @Get('/test')
    @Roles('member', 'admin')
    getTest(@Request() req) {
        return req.user;
    }
}
