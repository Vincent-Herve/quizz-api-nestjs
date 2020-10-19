import { Repository, EntityRepository } from "typeorm";
import { Answer } from '../entities/answer.entity';


@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {}