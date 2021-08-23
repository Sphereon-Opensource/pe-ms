import { ExchangeStatus, PresentationDefinitionWrapper, PresentationStatus, PresentationStatusWrapper, Status } from '@sphereon/pe-models';
import { Request, Response, Router } from 'express';

export const DEFINITIONS_CONTROLLER = Router();

const createDefinition = (req: Request, res: Response) => {
    const presentationDefinition: PresentationDefinitionWrapper  = req.body;
    res.status(201).json(presentationDefinition);
}

const retrieveDefinition = (req: Request, res: Response) => {
    const presentationDefinition: PresentationDefinitionWrapper = {
        "callback": {
            "url": "http:localhost:8080"
        },
        "challenge": {
            "token": "asdfasdfjlk;adsjf",
            "holder": "did:example:123"
        },
        "thread": {
            "id": "asdlfas;dlf"
        },
        "presentation_definition": {
            "id": "test",
            "input_descriptors": [
                {
                    "id": "test",
                    "schema": [
                        {
                            "uri": "http://test.com"
                        }
                    ]
                }
            ]
        }
    }
    res.status(200).json(presentationDefinition);
}

const retrieveDefinitionStatuses = (req: Request, res: Response) => {
    const status: PresentationStatusWrapper = { definition_id: 'test', statuses: [{ presentation_id: 'test',status: ExchangeStatus.Accepted }]}
    res.status(200).json(status);
}

DEFINITIONS_CONTROLLER.post('/definitions', createDefinition);
DEFINITIONS_CONTROLLER.get('/definitions/:id', retrieveDefinition);
DEFINITIONS_CONTROLLER.get('/definitions/:id/statuses', retrieveDefinitionStatuses);