import { IsMongoId } from "class-validator";
import { Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('thread')
export class ThreadEntity {
  @ObjectIdColumn({ name: '_id' })
  @IsMongoId({ message: 'Thread.id is invalid' })
  // @ts-ignore
  id: ObjectID;
}
