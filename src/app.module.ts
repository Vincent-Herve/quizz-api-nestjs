import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { QuizzModule } from './quizz/quizz.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    QuizzModule,
  ],
})
export class AppModule {}
