import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { User } from '../entity/user.entity';
import { AuthCredentialsDto } from '../../auth/dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async validateUserPassword(
        authCredentialsDto: AuthCredentialsDto
    ): Promise<{ username: string, sub: string }> {
        
        const { username, password } = authCredentialsDto;
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

    private async hashPassword(password: string): Promise<string> {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    }
}