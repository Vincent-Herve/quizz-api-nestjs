import { Module, OnModuleInit } from '@nestjs/common';
import * as config from 'config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateDataService } from './boot/create-data.service';
import { typeOrmConfig } from './config/typeorm.config';
import { QuizzModule } from './quizz/quizz.module';

const dbConfig = config.get('db');

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    QuizzModule
  ],
  providers: [CreateDataService]
})

export class AppModule implements OnModuleInit {
  constructor(private createDataService: CreateDataService) {}

  onModuleInit(): void {
    if (dbConfig.loadFixtures) this.createDataService.loadFixture();
  }
}