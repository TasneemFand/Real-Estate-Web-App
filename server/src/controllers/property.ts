import express from 'express';
import { getFilteredProperties, getPaginatedProperties, getPopularProperties, getRecentProperties, getRecommendedProperties, getTotalCount } from '../mongoDB/models/property';

export const getPropertyList = async (req: express.Request, res: express.Response) => {
    try {
        if(req.query['popular']){
            const properties = await getPopularProperties();
            return res.status(200).json(properties);
        } else if(req.query['recommended']) {
            const properties = await getRecommendedProperties();
            return res.status(200).json(properties);
        } else if (req.query['newest'] || req.query['mostRecent']) {
            const properties = await getRecentProperties();
            return res.status(200).json(properties);
        }
        const properties = await getPopularProperties();
        return res.status(200).json(properties);
      } catch (error) {
        console.log(error);
        return res.sendStatus(500);
      }
}

export const getAllProperties = async (req: express.Request, res: express.Response) => {
    try {
        const page = req.query['page'] ? parseInt(req.query['page'] as string) : 1;
        const pageSize = 10;
        // Calculate the start and end indexes for the requested page
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const {location, Status, type } = req.query;
        if (!location && !Status && !type) {
          const paginatedProperties = await getPaginatedProperties();
          const count = await getTotalCount();
          const totalPages = Math.ceil( count / pageSize);
          return res.status(200).json({ properties: paginatedProperties.slice(startIndex, endIndex), totalPages });
        } else {
          const filteredProperties = await getFilteredProperties({location, Status, type });
          const totalPages = Math.ceil( filteredProperties.length / pageSize);
          return res.status(200).json({ properties: filteredProperties.slice(startIndex, endIndex), totalPages });
        }
      } catch (error) {
        console.log(error);
        return res.sendStatus(500);
      }
}