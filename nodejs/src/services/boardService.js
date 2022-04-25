import {getDB} from '../config/connectDB';
import {createNew} from "../models/board";

const postNewBoardService = async(data) => {
    let result = null;
    try {
        result = await createNew(data);
    } catch (error) {
        console.log(error);
    }
    return result;
};

module.exports = {
    postNewBoardService
};
