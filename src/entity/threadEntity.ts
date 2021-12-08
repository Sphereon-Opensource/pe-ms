import { Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('thread')
export class ThreadEntity {
  @ObjectIdColumn({ name: '_id' })
  // @ts-ignore
  id: ObjectID;
}
