import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Group'})
export class GroupEntity {

    @PrimaryGeneratedColumn('uuid')
    //@ts-ignore
    hash: string;

    @Column()
    //@ts-ignore
    group: string;
}