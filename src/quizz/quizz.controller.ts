import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QuizzService } from './quizz.service';
import { Quizz } from './entities/quizz.entity';
import { UpdateQuizzDto } from './dto/update-quizz.dto';
import { CreateQuizzDto } from './dto/create-quizz.dto';

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
    createQuizz(@Body() createQuizzDto: CreateQuizzDto): Promise<Quizz> {
        this.logger.verbose(`Create simple quizz`);
        return this.quizzService.createQuizz(createQuizzDto);
    }
    
    @Patch('/:id')
    updateQuizz(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateQuizzDto: UpdateQuizzDto
    ): Promise<Quizz> {
        this.logger.verbose(`Update quizz's title and/or description`);
        return this.quizzService.updateQuizz(id, updateQuizzDto);
    }

    @Delete('/:id')
    deleteQuizz(@Param('id', ParseIntPipe) id: number): Promise<void> {
        this.logger.verbose(`Delete quizz by id`);
        return this.quizzService.deleteQuizz(id);
    } 
}
