import { NextFunction, Request, Response, Router } from 'express';

export const TEST_CONTROLLER: Router = Router();

const GREETINGS = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json({
            test: 'Hello from Express'
        });
    } catch(e) {
        next(e);
    }
}

TEST_CONTROLLER.get('/greetings', GREETINGS);