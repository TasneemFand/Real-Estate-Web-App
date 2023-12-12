import express from "express";

import { isAuthenticated } from "../middlewares";
import { getAllProperties, getPropertyList } from "../controllers/property";

export default (router: express.Router) => {
  router.get("/propertyList", isAuthenticated, getPropertyList);
  router.get("/properties", isAuthenticated, getAllProperties)
};
