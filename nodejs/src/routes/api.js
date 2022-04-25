import express from 'express';
import {getNewBoard, postNewBoard} from '../controllers/boardController';

const router = express.Router();

const apiRoutes = (app) => {
    router.get("/add-new-board", getNewBoard);
    router.post("/add-new-board", postNewBoard);

    return app.use("/api/v1/", router);
}

export default apiRoutes;