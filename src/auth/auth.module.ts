import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repository/user.repository';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  controllers: [AuthController],
  exports: [
    JwtStrategy,
    PassportModule
  ]
})
export class AuthModule {}
