import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'FieldId'})
export class FieldIdEntity {
    @PrimaryGeneratedColumn('uuid')
    //@ts-ignore
    hash: string;

    @Column()
    //@ts-ignore
    fieldId: string;
}