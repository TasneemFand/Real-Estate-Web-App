import express from 'express';

import { merge, get } from 'lodash';
import { getUserBySessionToken } from '../mongoDB/models/user';


const getBearerTokenFromHeader = (authToken: string) => {
  return authToken.split(" ")[1]
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      if (!req.headers.authorization) {
        return res.sendStatus(403);
      }
      const sessionToken = getBearerTokenFromHeader(req.headers.authorization);
      const existingUser = await getUserBySessionToken(sessionToken);
  
      if (!existingUser) {
        return res.sendStatus(403);
      }
  
      merge(req, { identity: existingUser });
  
      return next();
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }

  export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const { id } = req.params;
      const currentUserId = get(req, 'identity._id') as unknown as string;
  
      if (!currentUserId) {
        return res.sendStatus(400);
      }
  
      if (currentUserId.toString() !== id) {
        return res.sendStatus(403);
      }
  
      next();
      return next();
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  }