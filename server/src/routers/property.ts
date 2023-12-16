import express from "express";

import { isAuthenticated } from "../middlewares";
import { getAllProperties, getPropertyList, AddProperty } from "../controllers/property";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
export default (router: express.Router) => {
  router.get("/propertyList", isAuthenticated, getPropertyList);
  router.get("/properties", isAuthenticated, getAllProperties);
  router.post("/createProperty", isAuthenticated, upload.single("file"), AddProperty);

};
