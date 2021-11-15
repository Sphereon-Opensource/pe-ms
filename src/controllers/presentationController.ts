import { Request, Response, Router } from 'express';
import {getMongoRepository} from "typeorm";

import {PresentationWrapperEntity} from "../entity/presentationWrapper/presentationWrapperEntity";

export const PRESENTATION_CONTROLLER = Router();

const createPresentation = async (req: Request, res: Response) => {
  const presentation: PresentationWrapperEntity = req.body;
  const repository = getMongoRepository(PresentationWrapperEntity);
  repository.save(presentation).then(data => res.status(201).json(data)); //presentation wrapper
};

const retrievePresentation = async (req: Request, res: Response) => {
  const repository = getMongoRepository(PresentationWrapperEntity);
  repository.findOne(req.params['id']).then(data =>
    res.status(200).json(data)).catch(error => res.status(404));  //presentation wrapper
};

const retrievePresentationStatus = (req: Request, res: Response) => {
  res.status(200).json({ message: "method not implemented yet"}); // presentation status
};

const updatePresentationStatus = (req: Request, res: Response) => {
  //status response
  res.status(201).json({message: "method not implemented yet"}); // presentation status
};

PRESENTATION_CONTROLLER.post('/presentations', createPresentation);
PRESENTATION_CONTROLLER.get('/presentations/:id', retrievePresentation);
PRESENTATION_CONTROLLER.post('/presentations/:id/statuses', updatePresentationStatus);
PRESENTATION_CONTROLLER.get('/presentations/:id/statuses', retrievePresentationStatus);
