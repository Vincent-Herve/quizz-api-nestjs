import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from 'src/tag/repository/tag.repository';
import { QuizzController } from './quizz.controller';
import { QuizzService } from './quizz.service';
import { AnswerRepository } from './repository/answer.repository';
import { LevelRepository } from './repository/level.repository';
import { QuestionRepository } from './repository/question.repository';
import { QuizzRepository } from './repository/quizz.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizzRepository]),
    TypeOrmModule.forFeature([QuestionRepository]),
    TypeOrmModule.forFeature([AnswerRepository]),
    TypeOrmModule.forFeature([LevelRepository]),
    TypeOrmModule.forFeature([TagRepository]),
  ],
  exports: [TypeOrmModule],
  controllers: [QuizzController],
  providers: [QuizzService]
})
export class QuizzModule {}
