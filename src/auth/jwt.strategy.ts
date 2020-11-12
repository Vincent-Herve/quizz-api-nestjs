import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import * as config from 'config';
import { UserRepository } from '../user/repository/user.repository';
import { JwtPayload } from './jwt-payload.interface';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfig.secret
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const { username, sub } = payload;
    const user = await this.userRepository.findOne({ id: sub, username });
    
    if (!user) {
      throw new UnauthorizedException();
    }

    return { id: user.id, username: user.username, role: user.role };
  }
}