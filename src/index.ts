import compression from 'compression';
import express, { NextFunction, Request, Response } from 'express';
import { createConnection } from 'typeorm';

import { BASE_URL, ENV, PORT } from '../environment';

import { DEFINITIONS_CONTROLLER } from './controllers/definitionController';
import { HANDLE_400, HANDLE_500 } from './controllers/error_handler/errorHandler';
import { PRESENTATION_CONTROLLER } from './controllers/presentationController';
import { THREAD_CONTROLLER } from './controllers/threadController';

createConnection().then(() => {
  const APP: express.Application = express();

  APP.use(compression());
  APP.use(express.json());
  APP.use(express.urlencoded({ extended: true }));

  APP.use((req: Request, res: Response, next: NextFunction) => {
    console.log(req.url);
    next();
  });

  APP.use(BASE_URL, THREAD_CONTROLLER);
  APP.use(BASE_URL, PRESENTATION_CONTROLLER);
  APP.use(BASE_URL, DEFINITIONS_CONTROLLER);
  APP.use(HANDLE_400);
  APP.use(HANDLE_500);

  APP.listen(PORT, async () => {
    console.log('App is running at http://localhost:%d in %s mode', PORT, ENV);
    console.log('  Press CTRL-C to stop\n');
  });
});
