import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Any {

    @PrimaryGeneratedColumn('uuid')
    //@ts-ignore
    hash: string;

    @Column()
    //@ts-ignore
    key: string;

    @Column()
    //@ts-ignore
    value: string; 
}