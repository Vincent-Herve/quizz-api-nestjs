import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
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

    @Get('/:id')
    getQuizzById(@Param('id', ParseIntPipe) id: number): Promise<Quizz> {
        this.logger.verbose(`Get quizz by id`);
        return this.quizzService.getQuizzById(id);
    }

    /* @Post()
    createQuizz(@Body()) {
        return this.quizzService.createQuizz();
    }

    @Patch('/:id')
    updateQuizz(
        @Param(),
        @Body(),
    ) {
        return this.quizzService.updateQuizz();
    }

    @Delete('/:id')
    deleteQuizz(@Param('id', ParseIntPipe) id: number) {
        return this.quizzService.deleteQuizz(id);
    } */
}
