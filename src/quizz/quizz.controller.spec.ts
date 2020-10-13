import { Test, TestingModule } from '@nestjs/testing';
import { QuizzController } from './quizz.controller';
import { QuizzService } from './quizz.service';
import { QuizzRepository } from './quizz.repository';
import { Quizz } from './quizz.entity';

describe('QuizzController', () => {
  let quizzController: QuizzController;
  let quizzService: QuizzService;
  let quizzRepository: QuizzRepository;

  beforeEach(() => {
    quizzRepository = new QuizzRepository();
    quizzService = new QuizzService(quizzRepository);
    quizzController = new QuizzController(quizzService);
  });

  it('should be defined', () => {
    expect(quizzController).toBeDefined();
  });

  describe('getQuizzes', () => {
    it('should return an array of quizz', async () => {
      let result: Promise<Quizz[]>;
      jest.spyOn(quizzService, 'getQuizzes').mockImplementation(() => result);

      expect(await quizzController.getQuizzes()).toBe(result);
    });
  });

















});
