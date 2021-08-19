import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import { TEST_CONTROLLER } from './controllers/test-controller';
import { Server } from 'http';

const APP: express.Application = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.ENV || 'develepment';

APP.use(compression());
APP.use(express.json());
APP.use(express.urlencoded({extended: true}));

APP.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  next();
})

APP.use('/', TEST_CONTROLLER);

const SERVER: Server = APP.listen(PORT, async () => {
  console.log(
      "App is running at http://localhost:%d in %s mode",
      PORT,
      ENV
  );
  console.log("  Press CTRL-C to stop\n");
});
