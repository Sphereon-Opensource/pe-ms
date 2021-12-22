import { Proof, ProofType } from "@sphereon/pe-js/dist/main";
import { PEJS } from "@sphereon/pe-js/dist/main/lib";
import { Status } from "@sphereon/pe-models";
import { Request, Response, Router } from 'express';
import { getMongoRepository } from 'typeorm';

import {
  PresentationDefinitionWrapperEntity
} from "../entity/presentationDefinition/presentationDefinitionWrapperEntity";
import { PresentationWrapperEntity } from '../entity/presentationWrapper/presentationWrapperEntity';


export const PRESENTATION_CONTROLLER = Router();

const createPresentation = async (req: Request, res: Response) => {
  const pWrapper: PresentationWrapperEntity = req.body;
  //TODO error handling as a middleware
  if (!Object.keys(req.params['pdId']).length) {
    res.status(400).json({
        code: '400',
        tag: 'BAD REQUEST',
        status: Status.Error,
        message: 'PdId path param missing'
    })
  }

  let proofValid;
  if (Array.isArray(pWrapper.presentation.proof)) {
    proofValid = pWrapper.presentation.proof.find((p: Proof) => ProofType[p.type as ProofType]);
  } else {
    proofValid = ProofType[pWrapper.presentation.proof?.type as ProofType]
  }

  if (pWrapper.presentation.proof && !proofValid) {
    res.status(400).json({ error: 'presentation contains an invalid signature' });
  }

  const _id = req.params['pdId'];
  const pdWrapper = await getMongoRepository(PresentationDefinitionWrapperEntity).findOne(_id);
  if (pdWrapper?.challenge.token !== pWrapper.challenge.token) {
    res.status(400).json({ error: 'Invalid challenge token' });
  }
  if (pWrapper?.presentation && pdWrapper?.presentation_definition) {
    const peJs = new PEJS();
    const validationResult = peJs.evaluatePresentation(pdWrapper.presentation_definition, pWrapper.presentation);
    if (Array.isArray(validationResult) && validationResult[0].message != 'ok') {
      res.status(400).json(validationResult);
    }
  } else {
    res.status(400).json({ error: 'presentation_wrapper does not contain a presentation' });
  }

  getMongoRepository(PresentationWrapperEntity).save(pWrapper).then((data) => {
    pWrapper.callback = {
      url: `${req.protocol}://${req.headers.host}${req.baseUrl}${req.path.replace(/\d.+$/, '')}${data._id.toHexString()}`
    }
    res.status(201).json(data)
  });
};

const retrievePresentation = async (req: Request, res: Response) => {
  const repository = getMongoRepository(PresentationWrapperEntity);
  repository
    .findOne(req.params['id'])
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(404)); //presentation wrapper
};

const retrievePresentationStatus = (req: Request, res: Response) => {
  res.status(200).json({ message: 'method not implemented yet' }); // presentation status
};

const updatePresentationStatus = (req: Request, res: Response) => {
  //status response
  res.status(201).json({ message: 'method not implemented yet' }); // presentation status
};

PRESENTATION_CONTROLLER.post('/presentations/:pdId', createPresentation);
PRESENTATION_CONTROLLER.get('/presentations/:id', retrievePresentation);
PRESENTATION_CONTROLLER.post('/presentations/:id/statuses', updatePresentationStatus);
PRESENTATION_CONTROLLER.get('/presentations/:id/statuses', retrievePresentationStatus);
