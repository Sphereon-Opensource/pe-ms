import {Format} from "@sphereon/pe-models";
import {JwtObject} from "@sphereon/pe-models/model/jwtObject";
import {LdpObject} from "@sphereon/pe-models/model/ldpObject";
import {Column} from "typeorm";

import {JwtObjectEntity} from "./JwtObjectEntity";
import {LdpObjectEntity} from "./LdpObjectEntity";

export class FormatEntity implements Format {
    
    @Column(type => JwtObjectEntity)
    jwt?: JwtObjectEntity;
    @Column(type => JwtObjectEntity)
    jwt_vc?: JwtObjectEntity;
    @Column(type => JwtObjectEntity)
    jwt_vp?: JwtObjectEntity;
    @Column(type => LdpObjectEntity)
    ldp?: LdpObjectEntity;
    @Column(type => LdpObjectEntity)
    ldp_vc?: LdpObjectEntity;
    @Column(type => LdpObjectEntity)
    ldp_vp?: LdpObjectEntity;
    
    constructor(jwt?: JwtObject, jwt_vc?: JwtObject, jwt_vp?: JwtObject, ldp?: LdpObject, ldp_vc?: LdpObject, ldp_vp?: LdpObject) {
        this.jwt = jwt;
        this.jwt_vc = jwt_vc;
        this.jwt_vp = jwt_vp;
        this.ldp = ldp;
        this.ldp_vc = ldp_vc;
        this.ldp_vp = ldp_vp;
    }
}