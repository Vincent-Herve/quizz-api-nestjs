import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuizzService } from './quizz.service';
import { Quizz } from './entities/quizz.entity';
import { QuizzDto } from './dto/quizz.dto';

@ApiTags('quizz')
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

    @Post()
    createQuizz(@Body() quizzDto: QuizzDto): Promise<Quizz> {
        this.logger.verbose(`Create simple quizz`);
        return this.quizzService.createQuizz(quizzDto);
    }
    
    @Patch('/:id')
    updateQuizz(
        @Param('id', ParseIntPipe) id: number,
        @Body() quizzDto: QuizzDto
    ): Promise<Quizz> {
        this.logger.verbose(`Update quizz's title and description`);
        return this.quizzService.updateQuizz(id, quizzDto);
    }

    @Delete('/:id')
    deleteQuizz(@Param('id', ParseIntPipe) id: number): Promise<void> {
        this.logger.verbose(`Delete quizz by id`);
        return this.quizzService.deleteQuizz(id);
    } 
}
