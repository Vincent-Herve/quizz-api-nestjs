import { Repository, EntityRepository } from "typeorm";
import { Tag } from '../entities/tag.entity';


@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {}