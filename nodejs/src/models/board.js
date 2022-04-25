import Joi from 'joi';
import {getDB} from '../config/connectDB';

const boardCollectionName = 'boards';
const boardCollectionSchema = Joi.object({
    title: Joi.string().required().min(3).max(20),
    columnOrder: Joi.array().items(Joi.string()).default([]),
    createdAt: Joi.date().timestamp().default(Date.now()),
    updatedAt: Joi.date().timestamp().default(null),
    _destroy: Joi.boolean().default(false)
})

const validateSchema = async(data) => {
    return await boardCollectionSchema.validateAsync(data, {abortEarly: false});
}

const createNew = async(data) => {
    let result = null, errCode = 0;
    try{
        const value = await validateSchema(data);
        const db = getDB();
        result = await db.collection(boardCollectionName).insertOne(value);
    }catch(error){
        result = error.message;
        errCode = 1;
    }
    return {result, errCode};
}   

module.exports = {
    createNew
}