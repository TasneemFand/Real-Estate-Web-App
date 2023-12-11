import express from 'express';
import { getPopularProperties, getRecentProperties, getRecommendedProperties } from '../mongoDB/models/property';

export const getAllProperties = async (req: express.Request, res: express.Response) => {
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