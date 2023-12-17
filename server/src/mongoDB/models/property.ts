/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        country: { type: String, required: true },
        city: { type: String, required: true },
        address: {type: String, required: true}
    },
    description: {
        type: String,
        required: true,
    },
    price: { type: Number, required: true },
    popular: {type: Boolean, default: false},
    recommended: {type: Boolean, default: false},
    Status: { type: String, required: true, enum: ['ForSale', 'ForRent'] },
    type: {type: String, required: true, enum: ['Apartments', 'Houses', 'Commercial', 'Garages' ,'Lots']},
    photo: {
        type: String,
        required: true,
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    facility: {
        wifi: { type: Boolean, default: true },
        rooms: {type: Number, default: 4},
        baths: {type: Number, default: 3},
        space: {type: Number, default: 110},
        smookingArea: {type: Boolean, default: true},
        parkingArea: {type: Boolean, default: false},
        kitchen: {type: Boolean, default: true},
        balcon: {type: Boolean, default: true}
    },
    review: {type: Number, default: 3},
    otherImages: {type: Array}
  }, {timestamps: true});

export const propertyModel = mongoose.model("Property", PropertySchema);

export const getPropertyById = (id: string) => propertyModel.findById(id);
export const getPropertiesByUser = (id: string) => propertyModel.find({agent: id }).sort({updatedAt: -1})

export const getPopularProperties = () => propertyModel.find({popular: true}).sort({updatedAt: -1});
export const getRecommendedProperties = () => propertyModel.find({recommended: true}).sort({updatedAt: -1});
export const getRecentProperties = () => propertyModel.find().sort({updatedAt: -1});

export const createProperty = (values: Record<string, any>) => new propertyModel(values).save().then((property) => property.toObject());
export const deletePropertyById = (id: string) => propertyModel.findOneAndDelete({ _id: id });
export const updatePropertyById = (id: string, values: Record<string, any>) => propertyModel.findByIdAndUpdate(id, values);
export const getPaginatedProperties = () => propertyModel.find();
export const getTotalCount = () => propertyModel.count();

export const getFilteredProperties = async (filters: Record<string, any>) => {
    const query:Record<string, any> = {};
    let location = {};
    if (filters['location']) {
        location = 
            {$or: [{'location.country':new RegExp(filters['location'], 'i')},{'location.city':new RegExp(filters['location'], 'i')   }]}
    }
    if (filters['Status'] && filters['Status'] !== 'AnyStatus') {
        query.Status = { $regex: filters['Status'], $options: 'i' };
    }
    if(filters['type'] && filters['type'] !== 'AnyType') {
        query.type = { $regex: filters['type'], $options: 'i' };
    }
    const last = location ? {...location} : {};
    const filteredProperties = propertyModel.find({...query,...last});
    return filteredProperties;
}