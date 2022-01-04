import { ExchangeStatus, PresentationStatus } from "@sphereon/pe-models";
import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

import {ChallengeEntity} from "../challengeEntity";

@Entity("status_wrapper")
export class StatusWrapperEntity implements PresentationStatus {
    @ObjectIdColumn()
    // @ts-ignore
    _id: ObjectID;

    @Column({ type: 'simple-json' })
    // @ts-ignore
    thread: { id: ObjectID };

    @Column()
    // @ts-ignore
    presentation_id: string;

    @Column({ type: "enum", enum: ExchangeStatus})
    // @ts-ignore
    status: ExchangeStatus;

    @Column({ default: undefined })
    message?: string;

    @Column()
    // @ts-ignore
    challenge: ChallengeEntity;
}