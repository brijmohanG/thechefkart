
import { useLocation } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import './index.css'
export const IngredientModel = () => {
    const location = useLocation();
    const { ingredient } = location.state || {};
    const navigate = useNavigate();
    const redirectHome = () => {
        navigate('/')
    }

    return (
        
        <div className='ingredient-model-bg-container'>
            <div className='top-direction-container'>
                <FaArrowLeftLong  onClick={redirectHome} style={{ marginRight: "20px", marginTop: "7px", fontSize: "25px" }}/> 
                <h1> Ingredient list</h1>
            </div>
            <div className='ingredient-card-container'>
                <div>
                    <h1>{ingredient.name}</h1>
                    <p>{ingredient.description}</p>
                </div>
                <div>
                    <img src={ingredient.image} alt={ingredient.name} style={{ marginLeft: "20px"}}/>
                </div>
            </div>
            <div>
                <h1>Ingredients</h1>
                <p>For 2 people</p>
            </div>
            <div>
                <ul>
                    {ingredient.ingredients.map(item => <li>{item.name} : {item.quantity}</li>)}
                </ul>
            </div>
        </div>
    )
}