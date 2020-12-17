// import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/repository/user.repository';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let jwtService: JwtService;
  let options: JwtModuleOptions;
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
    options = {
      secret: 'topSecret51',
      signOptions: {
        expiresIn: '1800',
      }
    }
    jwtService = new JwtService(options);
    authService = new AuthService(userRepository, jwtService);
    authController = new AuthController(authService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

});
