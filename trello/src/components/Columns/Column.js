import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../ultil/constant';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Draggable } from "react-smooth-dnd";
import ConfirmModal from '../common/ConfirmModal';
import {Dropdown, Form} from 'react-bootstrap';
import { mapOrder } from '../../ultil/sort';
import Card from '../Card/Card';
import './Column.scss';
import {v4 as uuidv4} from 'uuid';


function Column(props) {
    const {column, onCardDrop, onUpdateColumn} = props;
    const cards = mapOrder(column.cards, column.cardOrder, 'id');

    const [showDelete, setShowDelete] = useState(false);
    const [titleColumn, setTitleColumn] = useState('');
    const [isFirstClick, setIsFirstClick] = useState(true);
    const inputRef = useRef(null);

    const [isShowAddCard, setIsShowAddCard] = useState(false);
    const [valueTextArea, setValueTextArea] = useState('');
    const textAreaRef= useRef(null);

    useEffect(() => {
        if(isShowAddCard === true && textAreaRef && textAreaRef.current) {
            textAreaRef.current.focus();
        }
    }, [isShowAddCard, textAreaRef]);


    useEffect(() => {
        if(column && column.title) {
            setTitleColumn(column.title);
        }
    }, [column]);

    const toggleModal = () => {
        setShowDelete(!showDelete);
    }

    const onModalAction = (type) => {
        if(type === MODAL_ACTION_CLOSE) {
            // do nothing
        }


        if(type === MODAL_ACTION_CONFIRM) {
            // do something
            const newColumn = {
                ...column,
                _destroy: true
            }
            onUpdateColumn(newColumn);
        }

        toggleModal();
    }

    const selectAllText = (event) => {
        setIsFirstClick(false);
        if(isFirstClick) {
            event.target.select();
        }else{
            inputRef.current.setSelectionRange(titleColumn.length, titleColumn.length);
        }
        // event.target.focus();

    }

    const ClickOutSide = (event) => {
        setIsFirstClick(true);
        const newColumn = {
            ...column,
            title: titleColumn,
            _destroy: false
        }
        onUpdateColumn(newColumn);
    }

    const addNewCard = () => {
        if(!valueTextArea) {
            textAreaRef.current.focus();
            return;
        }

        const newCard = {
            id: uuidv4(),
            boardId: column.boardId,
            columnId: column.id,
            title: valueTextArea,
            image: null,
        }

        let newColumn = {...column};
        newColumn.cards = [...newColumn.cards, newCard];
        newColumn.cardOrder = newColumn.cards.map(card => card.id);

        onUpdateColumn(newColumn);
        setValueTextArea('');
        setIsShowAddCard(false);

        console.log('newCard', newCard);
        console.log('newColumn', newColumn);
    }

    return (
        <>
            <div className="column">
                <header className='column-drag-handle'>
                    <div className=' column-title'>
                        <Form.Control
                            type="text"
                            size="sm"
                            value={titleColumn}
                            className='customize-input-column'
                            onClick = {selectAllText}
                            onChange = {(e)=>setTitleColumn(e.target.value)}
                            spellCheck="false"
                            onBlur={ClickOutSide}
                            onMouseDown={(e)=>e.preventDefault()}
                            ref={inputRef}
                        />
                    </div>

                    <div className='column-dropdown'>
                        <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic" size='sm'>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item >Add card</Dropdown.Item>
                                <Dropdown.Item onClick ={toggleModal}  >Remove this column</Dropdown.Item>
                                <Dropdown.Item >Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </header>

                    <div className='card-list'>
                        <Container
                            groupName='col'
                            onDrop={(dropResult)=>onCardDrop(dropResult, column.id)}
                            getChildPayload={index => cards[index]}
                            dragClass="card-ghost"
                            dropClass="card-ghost-drop"
                            dropPlaceholder={{                      
                            animationDuration: 150,
                            showOnTop: true,
                            className: 'card-drop-preview' 
                            }}
                            dropPlaceholderAnimationDuration={200}
                        >
                            {
                                cards?.length>0 &&
                                cards.map((card, index) => {
                                    return (
                                        <Draggable key={card.id}>
                                            <Card card={card} />
                                        </Draggable>
                                    )
                                })
                            }
                        </Container>

                        {
                            isShowAddCard ===true  &&
                            <div className='add-new-card'>
                                <div className="form-group">
                                    <textarea rows='2' className='form-control' placeholder='Enter a title'
                                        value={valueTextArea}
                                        ref={textAreaRef}
                                        onChange={(e)=>setValueTextArea(e.target.value)}
                                    >
                                    </textarea>
                                </div>

                                <div>
                                    <button onClick={()=> addNewCard()} type="button" className="btn btn-primary mr-4">Add</button>
                                    <i onClick={()=>setIsShowAddCard(false)} className='fa fa-times'></i>
                                </div>
                            </div>
                        }
                    </div>

                    {
                        isShowAddCard === false &&
                        <footer onClick={()=>setIsShowAddCard(true)}> 
                            <i className='fa fa-plus pr-3'></i> Add another card
                        </footer>
                    }
            </div>      
                    
            <ConfirmModal 
                show = {showDelete}
                title = {'Delete Column'}
                content = {`Are you sure you want to delete this column: <b>${column.title} </b> ?`}
                onAction = {onModalAction}
            />
        </>
    );
}

export default Column;