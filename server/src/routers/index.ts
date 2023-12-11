import express from "express";
import auth from './auth';
import users from './users';
import property from './property';

const router = express.Router();

/** create a new router object to handle requests */
export default (): express.Router => {
  auth(router);
  users(router);
  property(router);
  return router;
};
