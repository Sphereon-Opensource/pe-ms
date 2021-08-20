import { Request, Response, NextFunction, Router } from 'express';
import { PresentationStatus, PresentationWrapper } from '@sphereon/pe-models';

export const PRESENTATION_CONTROLLER = Router();

const createPresentation = (req: Request, res: Response, next: NextFunction) => {
    const presentation: PresentationWrapper = req.body;
    res.status(201).json(presentation);
}

const retrievePresentation = (req: Request, res: Response, next: NextFunction) => {
    const presentation: PresentationWrapper = {
        "presentation_submission": {
            "id": "test",
            "definition_id": "test",
            "descriptor_map": [
                {
                    "id": "test",
                    "format": "test",
                    "path": "$.verifiableCredential[0]"
                }
            ]
        },
        "callback": {
            "url": "http:localhost:8080"
        },
        "challenge": {
            "token": "asdfasdfjlk;adsjf",
            "holder": "did:example:123"
        }
    }
    res.status(200).json(presentation);
}

const retrievePresentationStatus = (req: Request, res: Response, next: NextFunction) => {
    const status = {
        "presentation_id": "test",
           "status": "ACCEPTED"
   }
   res.status(200).json(status);
}

const updatePresentationStatus = (req: Request, res: Response, next: NextFunction) => {
    const status: PresentationStatus = req.body;
    res.status(201).json(status);
}

PRESENTATION_CONTROLLER.post('/presentations', createPresentation);
PRESENTATION_CONTROLLER.get('/presentations/:id', retrievePresentation);
PRESENTATION_CONTROLLER.post('/presentations/:id/statuses', updatePresentationStatus);
PRESENTATION_CONTROLLER.get('/presentations/:id/statuses', retrievePresentationStatus);
