import React from 'react';
import Column from '../Columns/Column';
import './BoardContent.scss';

function BoardContent(props) {
    return (
        <div className="board-columns">
            <Column />
            <Column />
            <Column />
            <Column />
        </div>
    );
}
export default BoardContent;