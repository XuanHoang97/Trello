import { mapOrder } from '../../ultil/sort';
import Card from '../Card/Card';
import React from 'react';
import './Column.scss';
import { Container, Draggable } from "react-smooth-dnd";
import {Dropdown, Form} from 'react-bootstrap';
import ConfirmModal from '../common/ConfirmModal';
import { MODAL_ACTION_CLOSE, MODAL_ACTION_CONFIRM } from '../../ultil/constant';


function Column(props) {
    const {column, onCardDrop} = props;
    const cards = mapOrder(column.cards, column.cardOrder, 'id');

    const [showDelete, setShowDelete] = React.useState(false);

    const toggleModal = () => {
        setShowDelete(!showDelete);
    }

    const onModalAction = (type) => {
        if(type === MODAL_ACTION_CLOSE) {
            // do nothing
        }


        if(type === MODAL_ACTION_CONFIRM) {
            // do something
        }

        toggleModal();
    }

    return (
        <>
            <div className="column">

                <header className='column-drag-handle'>
                    <div className=' column-title'>
                        {column.title}
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