import React from 'react';
import Task from '../Task/Task';
import './Column.scss';

function Column(props) {
    return (
        <div className ="item-column">
            <h4>Brainstorm</h4>
            <ul className="list-task" >
                <img src="https://i.ytimg.com/vi/YZfpYvpMyEw/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBETQiH08bMpzUuhl5sb-ynhTXP5g" className="w-100 mb-3" alt="" />
                <Task />
                <Task />
                <Task />
            </ul>
            <footer>Add another card</footer>
        </div>
    );
}

export default Column;