import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../ultil/constant';
import React, { useEffect, useRef, useState } from 'react';
import { Container, Draggable } from "react-smooth-dnd";
import ConfirmModal from '../common/ConfirmModal';
import {Dropdown, Form} from 'react-bootstrap';
import { mapOrder } from '../../ultil/sort';
import Card from '../Card/Card';
import './Column.scss';


function Column(props) {
    const {column, onCardDrop, onUpdateColumn} = props;
    const cards = mapOrder(column.cards, column.cardOrder, 'id');

    const [showDelete, setShowDelete] = useState(false);
    const [titleColumn, setTitleColumn] = useState('');
    const [isFirstClick, setIsFirstClick] = useState(true);
    const inputRef = useRef(null);

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

    const handleclickOutSide = (event) => {
        setIsFirstClick(true);
        const newColumn = {
            ...column,
            title: titleColumn,
            _destroy: false
        }
        onUpdateColumn(newColumn);
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
                            onBlur={handleclickOutSide}
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
                </div>
                <footer>Add another card</footer>
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