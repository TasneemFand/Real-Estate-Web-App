import express from 'express';
import { createProperty, getFilteredProperties, getPaginatedProperties, getPopularProperties, getRecentProperties, getRecommendedProperties, getTotalCount } from '../mongoDB/models/property';
import { UploadImage } from '../helpers';
import { get } from 'lodash';
import { getUserById } from '../mongoDB/models/user';

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

export const AddProperty = async (req: express.Request, res: express.Response) => {
  try{
    const requiredValues = ['name', 'country', 'city', 'address', 'description', 'price', 'Status', 'type'];
    const reqBody = JSON.parse(req.body.data);
    const Invalid = requiredValues.filter((value) => !Object.hasOwn(reqBody, value)).length > 0;
    if(Invalid || !req.file) {
      res.status(400).send('Missing required values');
      return res;
    }
    const result = await UploadImage(req.file?.buffer);
    let photoUrl = '';
    if(result) {
      photoUrl = (result as {url: string}).url;
    }
    const currentUserId = get(req, 'identity._id') as unknown as string;
    const property = await createProperty({
      ...reqBody,
      location: {
        country: reqBody.country,
        city: reqBody.city,
        address: reqBody.address
      },
      photo: photoUrl,
      agent: currentUserId
    });
    const user = await getUserById(currentUserId);
    user?.allProperties.push(property._id);
    await user?.save();
    return res.status(200).json(property).end();
  } catch (error) {
      console.log(error);
      return res.sendStatus(500);
  }
}