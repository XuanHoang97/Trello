import {postNewBoardService} from '../services/boardService';

const getNewBoard = (req, res) => {
    res.send('test api from controller !');
};

const postNewBoard = async(req, res) => {
    console.log('test body: ', req.body);
    let result = await postNewBoardService(req.body);
    return res.status(200).json({
        msg: 'ok',
        data: result
    });
};

module.exports = {
    getNewBoard,
    postNewBoard
};