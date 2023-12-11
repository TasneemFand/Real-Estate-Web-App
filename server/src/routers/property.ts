import express from "express";

import { isAuthenticated } from "../middlewares";
import { getAllProperties } from "../controllers/property";

export default (router: express.Router) => {
  router.get("/propertyList", isAuthenticated, getAllProperties);
};
