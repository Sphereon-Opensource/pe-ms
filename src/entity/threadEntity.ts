import { Thread } from '@sphereon/pe-models';
import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Thread' })
export class ThreadEntity implements Thread {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  id: string;
}
