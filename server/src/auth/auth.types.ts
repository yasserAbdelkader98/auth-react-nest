import { Request } from 'express';

export interface AuthPayload {
  id: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user: AuthPayload;
}
