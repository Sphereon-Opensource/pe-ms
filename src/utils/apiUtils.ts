import { Request } from "express";

import { ApiError } from "../controllers/error_handler/errorHandler";
import { PresentationWrapperEntity } from "../entity/presentation/presentationWrapperEntity";
import {
    PresentationDefinitionWrapperEntity
} from "../entity/presentationDefinition/presentationDefinitionWrapperEntity";

export const validateProperties = (properties: string[], req: Request): void => {
    const missingProps = properties.filter(key => !Object.keys(req.body).includes(key))
    if (missingProps.length) {
        throw new ApiError(`Required properties missing: ${missingProps.join(', ')}`)
    }
}

export const setCallbackUrl = (req: Request, entity: PresentationDefinitionWrapperEntity | PresentationWrapperEntity) => {
    return {
        url: `${req.protocol}://${req.headers.host}${req.baseUrl}${req.path}/${entity._id.toHexString()}`
    }
}