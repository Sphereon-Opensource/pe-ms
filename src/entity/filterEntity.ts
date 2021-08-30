import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Any } from './any';
import { _EnumEntity } from './_enumEntity';

@Entity({ name: 'Filter' })
export class FilterEntity {
  @PrimaryGeneratedColumn('uuid')
  //@ts-ignore
  hash: string;

  @Column()
  //@ts-ignore
  type: string;

  @Column({ default: null })
  format?: string;

  @Column({ default: null })
  pattern?: string;

  @Column({ default: null })
  minLength?: number;

  @Column({ default: null })
  maxLength?: number;

  @Column({ default: null })
  minimum?: number;

  @Column({ default: null })
  exclusiveMinimum?: number;

  @Column({ default: null })
  exclusiveMaximum?: number;

  @Column({ default: null })
  maximum?: number;

  @Column({ default: null })
  _const?: number;

  @OneToMany(() => _EnumEntity, _enum => _enum.hash)
  _enum?: _EnumEntity[];

  @OneToOne(() => Any, {cascade: true})
  @JoinColumn()
  not?: Any;
}
