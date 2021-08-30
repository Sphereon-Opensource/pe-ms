import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FilterEntity } from './filterEntity';

@Entity({name: '_Enum'})
export class _EnumEntity {

    @PrimaryGeneratedColumn('uuid')
    //@ts-ignore
    hash: string;

    @Column()
    //@ts-ignore
    _enum: number;

    @ManyToOne(() => FilterEntity, filter => filter.hash)
    //@ts-ignore
    filterEntity: FilterEntity;
}