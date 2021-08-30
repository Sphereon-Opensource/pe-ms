import { Field, Filter, Optionality } from '@sphereon/pe-models';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { FilterEntity } from './filterEntity';
import { PathEntity } from './pathEntity';

@Entity({ name: 'Field' })
export class FieldEntity implements Field {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;

  @Column({ default: null })
  id?: string;

  @OneToMany(() => PathEntity, path => path.hash)
  //@ts-ignore
  path?: Array<PathEntity>;

  @Column({ default: null })
  purpose?: string;

  @OneToOne(() => FilterEntity, { cascade: true })
  @JoinColumn()
  filter?: Filter;

  @Column({ default: null })
  predicate?: Optionality;
}
