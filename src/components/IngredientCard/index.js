import { useState } from 'react';
import './index.css';

export const IngredientCard = ({text, isAdded, onAddItem, onRemoveItem}) => {
    const [selected, setSelected] = useState(false);

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
    return (
        <div className='ingredient-card-bg-container'>
            <div>
                <img src={text.image} className='ingredient-card-image' alt={text.name} />
            </div>
            <div className='ingredient-card-heading-add-button-container'>
                <div className='ingredient-card-heading-container'>
                    <h1 className='card-main-heading'>{text.name}</h1>
                    <button className={typeClass}><span className={typeDotClass}></span></button>
                </div>
                <div>
                    <div className='ingredient-add-button-container'>
                        {isAdded.filter(item => item.id === text.id).length > 0 || selected ? <button className='add-item-button remove' onClick={removeItem}>Remove</button> : <button className='add-item-button' onClick={addItem}>Add +</button>}
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <p className='ingredient-description-paragraph'>
                        {text.category.name + " " + text.description}
                    </p>
                </div>
                <div className='ingredient-container'>
                    <img style={{ height: "20px", marginRight: "8px" }} src='https://res.cloudinary.com/dmr1euvhf/image/upload/v1757667532/Group_qxdabz.png' alt='ingredient' />
                    <p>Ingredient</p>
                </div>
            </div>
        </div>
    )
}
