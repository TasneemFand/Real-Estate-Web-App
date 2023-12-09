import express from "express";
import auth from './auth';
import users from './users';

const router = express.Router();

/** create a new router object to handle requests */
export default (): express.Router => {
  auth(router);
  users(router);
  return router;
};
