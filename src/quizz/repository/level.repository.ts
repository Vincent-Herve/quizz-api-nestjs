import { Repository, EntityRepository } from "typeorm";
import { Level } from '../entity/level.entity';


@EntityRepository(Level)
export class LevelRepository extends Repository<Level> {}