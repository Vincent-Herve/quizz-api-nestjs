import { Module } from '@nestjs/common';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateDataService } from './boot/create-data.service';
import { typeOrmConfig } from './config/typeorm.config';
import { QuizzModule } from './quizz/quizz.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

const dbConfig = config.get('db');

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    QuizzModule,
    AuthModule,
    UserModule
  ],
  providers: [CreateDataService]
})

export class AppModule {
  constructor(private createDataService: CreateDataService) {}

  onModuleInit(): void {
    if (dbConfig.loadFixtures) this.createDataService.loadFixture();
  }
}