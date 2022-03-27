import React, { useEffect, useState } from 'react';
import { DATA_FAKE } from '../../actions/DataFake';
import { mapOrder } from '../../ultil/sort';
import Column from '../Columns/Column';
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from '../../ultil/dragDrop';
import './BoardContent.scss';
import _ from 'lodash';

function BoardContent(props) {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const boardInitData = DATA_FAKE.boards.find(item => item.id === 'board1');
        if(boardInitData) {
            setBoard(boardInitData);
            setColumns(mapOrder(boardInitData.columns, boardInitData.columnOrder, 'id'));
        }
    }, []);

    if(_.isEmpty(board)) {
        return 'board not found';
    }

    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns];
        newColumns = applyDrag(newColumns, dropResult);

        let newBoard = {...board};
        newBoard.columnOrder = newColumns.map(column => column.id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
    }

    const onCardDrop = (dropResult, columnId) => {
        if(dropResult.removedIndex === null || dropResult.addedIndex === null) {
            let newColumns = [...columns];
            let currentColumn = newColumns.find(column => column.id === columnId);
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
            currentColumn.cardOrder = currentColumn.cards.map(card => card.id);

            setColumns(newColumns);
        }
    }

    return (
        <div className="board-columns">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload = {(index) => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
            >
                {
                    columns?.length>0 && columns.map((column, index) => {
                        return (
                            <Draggable key={column.id}>
                                <Column 
                                    column={column} 
                                    onCardDrop={onCardDrop}
                                />
                            </Draggable>
                        )
                    })
                }

                <div className='add-new-column ml-2'>
                    <button type="button" className="btn btn-light"> <i className='fa fa-plus'></i> Add another column</button>
                </div>

            </Container>
        </div>
    );
}
export default BoardContent;