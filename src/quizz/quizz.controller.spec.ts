import { Test } from '@nestjs/testing';
import { QuizzController } from './quizz.controller';
import { QuizzService } from './quizz.service';
import { QuizzRepository } from './repository/quizz.repository';
import { Quizz } from './entity/quizz.entity';

describe('QuizzController', () => {
  let quizzController: QuizzController;
  let quizzService: QuizzService;
  // let quizzRepository: QuizzRepository;

  /* beforeEach(() => {
    quizzRepository = new QuizzRepository();
    quizzService = new QuizzService(quizzRepository);
    quizzController = new QuizzController(quizzService);
  }); */

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [QuizzController],
        providers: [
          QuizzService,
          QuizzRepository
        ],
      }).compile();

    quizzService = moduleRef.get<QuizzService>(QuizzService);
    quizzController = moduleRef.get<QuizzController>(QuizzController);
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
