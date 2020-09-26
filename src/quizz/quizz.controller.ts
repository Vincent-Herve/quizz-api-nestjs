import { Controller, Get, Logger } from '@nestjs/common';
import { QuizzService } from './quizz.service';
import { Quizz } from './quizz.entity';

@Controller('quizz')
export class QuizzController {
    private logger = new Logger('QuizzController');

    constructor(private quizzService: QuizzService) {}

    @Get()
    getQuizzes(): Promise<Quizz[]> {
        this.logger.verbose(`Get all quizz`);
        return this.quizzService.getQuizzes();
    }
}
