import { Status, StatusResponse } from '@sphereon/pex-models';
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
        JSON.stringify(
          error.map((e) => {
            return { property: e.property, constraints: e.constraints };
          })
        )
      )
    );
  } else {
    next(error);
  }
};

export const HANDLE_400 = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    res.status(400).json({ message: error.message });
  } else {
    next(error);
  }
};

export const HANDLE_404 = (req: Request, res: Response) => {
  const status: StatusResponse = {
    status: Status.Error,
    issues: [{ code: '404', tag: 'NOT FOUND', status: Status.Error, message: 'Resource not found' }],
  };
  res.status(404).json(status);
};

export const HANDLE_500 = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error) {
    const status: StatusResponse = {
      status: Status.Error,
      issues: [{ code: '500', tag: 'INTERNAL SERVER ERROR', status: Status.Error, message: error.message }],
    };
    res.status(500).json(status);
  } else {
    next();
  }
};
