import React, { useEffect, useRef, useState } from 'react';
import { DATA_FAKE } from '../../actions/DataFake';
import { mapOrder } from '../../ultil/sort';
import Column from '../Columns/Column';
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from '../../ultil/dragDrop';
import './BoardContent.scss';
import _ from 'lodash';
import {v4 as uuidv4} from 'uuid';

function BoardContent(props) {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);
    const [isShowAddList, setIsShowAddList] = useState(false);
    const [valueInput, setValueInput] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        const boardInitData = DATA_FAKE.boards.find(item => item.id === 'board1');
        if(boardInitData) {
            setBoard(boardInitData);
            setColumns(mapOrder(boardInitData.columns, boardInitData.columnOrder, 'id'));
        }
    }, []);


    useEffect(() => {
        if(isShowAddList === true && inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isShowAddList]);

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

    const handleAddList = () => {
        if(!valueInput) {
            if(inputRef && inputRef.current)
                inputRef.current.focus();
            return;
        }

        //update board columns
        const _columns = _.cloneDeep(columns);
        _columns.push({
            id: uuidv4(),
            boardId: board.id,
            title: valueInput,
            cards: [],
        });
        setColumns(_columns);
        setValueInput('');
        inputRef.current.focus();
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

                <div className='addTask'>
                    {
                        !isShowAddList ?
                        <div className='add-new-column'>
                            <button onClick={()=> setIsShowAddList(true)} type="button" className="btn btn-light"> <i className='fa fa-plus'></i> Add another column</button>
                        </div>
                        :
                        <div className='content-add-column pt-2'>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="" ref={inputRef} 
                                    value={valueInput}
                                    onChange={(e)=> setValueInput(e.target.value)}
                                />
                            </div>

                            <div>
                                <button onClick={()=> handleAddList()} type="button" className="btn btn-success mr-4">Add</button>
                                <i onClick={()=> setIsShowAddList(false)} className='fa fa-times'></i>
                            </div>
                        </div>

                    }

                </div>
            </Container>
        </div>
    );
}
export default BoardContent;