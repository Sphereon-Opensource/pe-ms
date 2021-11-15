import { Request, Response, Router } from 'express';
import {getMongoRepository} from "typeorm";

import {PresentationWrapperEntity} from "../entity/presentationWrapper/presentationWrapperEntity";

export const PRESENTATION_CONTROLLER = Router();

const createPresentation = async (req: Request, res: Response) => {
  const presentation: PresentationWrapperEntity = req.body;
  const repository = getMongoRepository(PresentationWrapperEntity);
  const result = await repository.save(presentation);
  res.status(201).json(result); //presentation wrapper
};

const retrievePresentation = async (req: Request, res: Response) => {
  const repository = getMongoRepository(PresentationWrapperEntity);
  const result = await repository.findOne(req.params['id']); //presentation wrapper
  if (result) {
    res.status(200).json(result);
  }
  res.status(404);
};

const retrievePresentationStatus = (req: Request, res: Response) => {
  res.status(200).json({ message: "presentation wrapper does not contain status"}); // presentation status
};

const updatePresentationStatus = (req: Request, res: Response) => {
  //status response
  res.status(201).json({message: "presentation wrapper does not have status"}); // presentation status
};

PRESENTATION_CONTROLLER.post('/presentations', createPresentation);
PRESENTATION_CONTROLLER.get('/presentations/:id', retrievePresentation);
PRESENTATION_CONTROLLER.post('/presentations/:id/statuses', updatePresentationStatus);
PRESENTATION_CONTROLLER.get('/presentations/:id/statuses', retrievePresentationStatus);
