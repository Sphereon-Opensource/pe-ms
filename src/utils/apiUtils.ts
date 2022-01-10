import { Request } from "express";

export const generateDefinitionUrl = (req: Request) => {
    return {
        definition_url: `${req.protocol}://${req.headers.host}${req.baseUrl}/definitions/${req.body.presentation_definition.id}`
    }
}