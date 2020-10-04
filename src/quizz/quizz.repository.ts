import { Repository, EntityRepository } from "typeorm";
import { Quizz } from './quizz.entity';

@EntityRepository(Quizz)
export class QuizzRepository extends Repository<Quizz> {}