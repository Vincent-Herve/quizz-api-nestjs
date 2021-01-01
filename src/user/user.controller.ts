import { Controller, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { GetUserInfo } from './get-user-info.decorator';
import { UserInfo } from './user-info.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
    
    @UseGuards(AuthGuard(), RolesGuard)
    @Get('/getInfo')
    @Roles('member', 'admin')
    getUserInfo(@GetUserInfo() userInfo: UserInfo): UserInfo {
        return userInfo;
    }
}