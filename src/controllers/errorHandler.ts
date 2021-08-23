import { Issue, Status, StatusResponse } from '@sphereon/pe-models';
import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';

export const HANDLE_400 = (req: Request, res: Response, next: NextFunction) => {
    const status: StatusResponse = { status: Status.Error, issues: [] };
    if (!Object.entries(req.body).length && req.method === 'POST') {
        const issue: Issue = { code: '400', tag: 'BAD REQUEST', status: Status.Error, message: 'Request body must be present' };
        status.issues.push(issue);
        res.status(400).json(status);
    } else {
        next();
    }
}

export const HANDLE_404 = (req: Request, res: Response) => {
    const status: StatusResponse = { 
        status: Status.Error, 
        issues: [
            { code: '404', tag: 'NOT FOUND', status: Status.Error, message: 'Resource not found' }
        ] 
    };
    res.status(404).json(status);
}

export const HANDLE_500 = (req: Request, res: Response) => {
    const status: StatusResponse = { 
        status: Status.Error, 
        issues: [
            { code: '500', tag: 'INTERNAL SERVER ERROR', status: Status.Error, message: 'Something went wrong' }
        ] 
    };
    res.status(500).json(status);
}