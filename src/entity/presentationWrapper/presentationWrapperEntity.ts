import {PresentationWrapper} from "@sphereon/pe-models";
import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

import {CallbackEntity} from "./callbackEntity";
import {ChallengeEntity} from "./challengeEntity";
import {PresentationSubmissionEntity} from "./presentationSubmissionEntity";

@Entity('presentation_wrapper')
export class PresentationWrapperEntity implements PresentationWrapper {
    
    @ObjectIdColumn()
    // @ts-ignore
    _id: ObjectID;
    @Column()
    // @ts-ignore
    callback: CallbackEntity;
    @Column()
    // @ts-ignore
    challenge: ChallengeEntity;
    @Column()
    // @ts-ignore
    presentation_submission: PresentationSubmissionEntity;
}