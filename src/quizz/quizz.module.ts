import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizzController } from './quizz.controller';
import { QuizzService } from './quizz.service';
import { QuizzRepository } from './repository/quizz.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([QuizzRepository]),
  ],
  controllers: [QuizzController],
  providers: [QuizzService]
})
export class QuizzModule {}
