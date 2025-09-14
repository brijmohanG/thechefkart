import { useState } from 'react';
import './index.css';

export const DishCard = ({ text, maxLength = 50, onAddItem, onRemoveItem, isAdded, onClickIngredient }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selected, setSelected] = useState(false);
    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const displayText =
        isExpanded || typeof text.description !== 'string'
            ? text.description || ''
            : `${text.description.slice(0, maxLength)}...`;

    const typeClass = text.type === "VEG" ? "card-veg-button" : "card-non-veg-button";
    const typeDotClass = text.type === "VEG" ? "card-dot" : "card-non-veg-dot";

    const addItem = () => {
        onAddItem(text.id);


        setSelected(true);
    };
    const removeItem = () => {
        onRemoveItem(text.id);
        setSelected(false);
    }
    const onIngredient = () => {
        onClickIngredient(text);
    }

    return (
        <div className='card-bg-container'>
            <div className='card-left-container'>
                <div className='card-heading-container'>
                    <h1 className='card-main-heading'>{text.name}</h1>
                    <button className={typeClass}><span className={typeDotClass}></span></button>
                </div>
                <p className='card-paragraph'>
                    {displayText}
                    <span
                        onClick={toggleReadMore}
                        style={{ color: 'black', fontWeight: "700", cursor: 'pointer', marginLeft: '5px' }}
                    >
                        {isExpanded ? 'Read less' : 'Read more'}
                    </span>
                </p>
                <div className='ingredient-container' onClick={onIngredient}>
                    <img style={{ height: "20px", marginRight: "8px" }} src='https://res.cloudinary.com/dmr1euvhf/image/upload/v1757667532/Group_qxdabz.png' alt='ingredient' />
                    <p>Ingredient</p>
                </div>
            </div>
            <div>
                <div>
                    <div className='card-image-container'>
                        <img src={text.image} className='card-image' alt={text.name} />
                    </div>
                    <div className='add-button-container'>
                        {isAdded.filter(item => item.id === text.id).length > 0 || selected ? <button className='add-item-button remove' onClick={removeItem}>Remove</button> : <button className='add-item-button' onClick={addItem}>Add +</button>}
                    </div>
                </div>
            </div>
        </div>
    )
}