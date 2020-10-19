import { Test, TestingModule } from '@nestjs/testing';
import { QuizzService } from './quizz.service';
import { QuizzRepository } from './repository/quizz.repository';

const mockQuizzRepository = () => ({
  find: jest.fn(),
});

describe('QuizzService', () => {
  let quizzService;
  let quizzRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizzService,
        { provide: QuizzRepository, useFactory: mockQuizzRepository }
      ],
    }).compile();

    quizzService = module.get<QuizzService>(QuizzService);
    quizzRepository = module.get<QuizzRepository>(QuizzRepository);
  });

  describe('getQuizzes', () => {
    it('get all quizz from the repository', async () => {
      quizzRepository.find.mockResolvedValue('someValue');
      
      const result = await quizzService.getQuizzes();
      expect(result).toEqual('someValue');
    });
  });




















});
