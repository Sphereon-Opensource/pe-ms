import { NextFunction, Request, Response } from 'express';

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleErrors = (error: Error, next: NextFunction) => {
  if (Array.isArray(error)) {
    next(
      new ApiError(
        JSON.stringify({ errors:
          error.map((e) => {
            return { property: e.property, constraints: e.constraints };
          })
        })
      )
    );
  } else {
    next(error);
  }
};

export const HANDLE_400 = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    res.status(400).json(error.message);
  } else {
    next(error);
  }
};

export const HANDLE_500 = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    next();
  }
};
