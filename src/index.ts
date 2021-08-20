import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression'; 
import { THREAD_CONTROLLER } from './controllers/threadController';
import { PRESENTATION_CONTROLLER } from './controllers/presentationController';
import { DEFINITIONS_CONTROLLER } from './controllers/definitionController';

const APP: express.Application = express();

APP.use(compression());
APP.use(express.json());
APP.use(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 3000;
const ENV =  process.env.ENV;

APP.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  next();
})

APP.use('/pe/v1', THREAD_CONTROLLER);
APP.use('/pe/v1', PRESENTATION_CONTROLLER);
APP.use('/pe/v1', DEFINITIONS_CONTROLLER);

APP.listen(PORT, async () => {
  console.log(
      "App is running at http://localhost:%d in %s mode",
      PORT,
      ENV
  );
  console.log("  Press CTRL-C to stop\n");
});
