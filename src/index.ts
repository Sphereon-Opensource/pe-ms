import express, { NextFunction, Request, Response, Router } from 'express';
import compression from 'compression'; 
import { THREAD_CONTROLLER } from './controllers/threadController';
import { PRESENTATION_CONTROLLER } from './controllers/presentationController';
import { DEFINITIONS_CONTROLLER } from './controllers/definitionController';
import { HANDLE_400, HANDLE_404, HANDLE_500 } from './controllers/errorHandler';

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

APP.use(HANDLE_400);
APP.use('/pe/v1', THREAD_CONTROLLER);
APP.use('/pe/v1', PRESENTATION_CONTROLLER);
APP.use('/pe/v1', DEFINITIONS_CONTROLLER);
APP.use(HANDLE_404);
APP.use(HANDLE_500);

APP.listen(PORT, async () => {
  console.log(
      "App is running at http://localhost:%d in %s mode",
      PORT,
      ENV
  );
  console.log("  Press CTRL-C to stop\n");
});