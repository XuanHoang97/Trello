import React from 'react';
import './Card.scss';

function Card(props) {
    const {card} = props;

    return (
        <div className="item-card">
            <img src={card.image}  alt=""
                onMouseDown={event => event.preventDefault()}
            />
            {card.title}
        </div>
    );
}

export default Card;