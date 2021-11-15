import {Filter} from "@sphereon/pe-models";
import {Column} from "typeorm";

export class FilterEntity implements Filter {

    @Column({name: 'const'})
    _const?: number;
    @Column({name: 'enum'})
    _enum?: number[];
    @Column()
    exclusiveMaximum?: number;
    @Column()
    exclusiveMinimum?: number;
    @Column()
    format?: string;
    @Column()
    maxLength?: number;
    @Column()
    maximum?: number;
    @Column()
    minLength?: number;
    @Column()
    minimum?: number;
    @Column()
    not?: any; //The type should be changed in the interface
    @Column()
    pattern?: string;
    @Column()
    type: string;

    constructor(type: string, pattern?: string, not?: any, minimum?: number, minLength?: number, maximum?: number,
                maxLength?: number, format?: string, exclusiveMinimum?: number, exclusiveMaximum?: number, _enum?: number[],
                _const?: number){
        this.type = type;
        this.pattern = pattern;
        this.not = not;
        this.minimum = minimum;
        this.minLength = minLength;
        this.maximum = maximum;
        this.maxLength = maxLength;
        this.format = format;
        this.exclusiveMinimum = exclusiveMinimum;
        this.exclusiveMaximum = exclusiveMaximum;
        this._enum = _enum;
        this._const = _const;
    }
}