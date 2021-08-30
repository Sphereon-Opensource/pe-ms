import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Path'})
export class PathEntity {

    @PrimaryGeneratedColumn('uuid')
    //@ts-ignore
    hash: string;

    @Column()
    //@ts-ignore
    path: string
}