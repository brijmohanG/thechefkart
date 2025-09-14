import { useState } from 'react';
import { data } from "../../data/mockDishes"
import { DishCard } from "../DishCard"
import { IngredientCard } from "../IngredientCard"
import { CiSearch } from "react-icons/ci";
import './index.css';

export const DishList = () => {
    const [filterList, setFilterList] = useState(data);
    const [mealType, setMealType] = useState("");
    const [selectItem, setSelectItem] = useState([]);
    const [search, setSearch] = useState("");
    const [showIngredient, setShowIngredient] = useState(false);
    const [ingredientItem, setIngredientItem] = useState("");

    const onSearch = (event) => {
        const searchValue = event.target.value
        if (searchValue.length > 0) {
            setSearch(searchValue)
        } else {
            setFilterList(data);
        }

    }

    const onSearchClick = () => {
        setFilterList(data);
        setMealType("");
        const filtered = data.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()));
        setFilterList(filtered);
    }

    let selectItemCount;

    if (filterList.length === data.length) {
        if (selectItem.length > 0) {
            selectItemCount = selectItem.length;
        }
        else {
            selectItemCount = 0;
        }
    } else if (mealType === "STARTER") {
        selectItemCount = selectItem.filter(item => item.mealType === "STARTER").length
    } else if (mealType === "MAIN COURSE") {
        selectItemCount = selectItem.filter(item => item.mealType === "MAIN COURSE").length
    } else if (mealType === "DESSERT") {
        selectItemCount = selectItem.filter(item => item.mealType === "DESSERT").length
    } else if (mealType === "SIDES") {
        selectItemCount = selectItem.filter(item => item.mealType === "SIDES").length
    } else {
        selectItemCount = 0;
    }

    const setVegList = () => {
        const vegList = data.filter(item => {
            if (mealType !== "") {
                return item.type === "VEG" && item.mealType === mealType;
            } else {
                return item.type === "VEG";
            }
        });
        setFilterList(vegList);

    }
    const setNonVegList = () => {

        const nonVegList = data.filter(item => {
            if (mealType !== "") {
                return item.type === "NON-VEG" && item.mealType === mealType;
            } else {
                return item.type === "NON-VEG";
            }
        });
        setFilterList(nonVegList);


    };

    const onClickType = (event) => {
        const clickValue = event.target.value;
        setMealType(clickValue);

        const filteredData = data.filter(item => item.mealType === clickValue);
        setFilterList(filteredData);
    };

    const onAddItem = (id) => {
        const selectedItem = data.find(item => item.id === id);
        if (selectItem.length > 0) {
            if (selectItem.filter(item => item.id !== id)) {
                setSelectItem(prev => [...prev, selectedItem]);
            }
        } else {
            setSelectItem(prev => [...prev, selectedItem]);
        }
    }
    const onRemoveItem = (id) => {
        if (selectItem.length > 1) {
            const removeItem = selectItem.filter(item => item.id !== id);
            setSelectItem(removeItem);
        } else {
            setSelectItem([]);
        }
    }

    const onClickIngredient = (text) => {
        setIngredientItem(text);
        setShowIngredient(true);
    }
    const removeIngredientBlur = () => {
        if (showIngredient) {
            setShowIngredient(false);
        }
    };

    return (
        <div className="bg-container">
            <div onClick={removeIngredientBlur}>
                <div className={showIngredient ? "blur" : ""} >
                    <div className='headder-container'>
                        <div className='search-dish-container'>
                            <input className='search-input' type='search' onChange={onSearch} placeholder='Search dish for your party......' />
                            <button className='search-button' onClick={onSearchClick}><CiSearch className='search-icon' /></button>
                        </div>
                        <div className='category-button-container'>
                            {mealType === "STARTER" ? <button className='category-button active' value="STARTER" onClick={onClickType}>Starter {selectItem.length > 0 ? selectItem.filter(item => item.mealType === "STARTER").length : 0}/{data.filter(item => item.mealType === "STARTER").length}</button> :
                                <button className='category-button' value="STARTER" onClick={onClickType}>Starter {selectItem.length > 0 ? selectItem.filter(item => item.mealType === "STARTER").length : 0}/{data.filter(item => item.mealType === "STARTER").length}</button>}
                            {mealType === "MAIN COURSE" ? <button className='category-button active' value="MAIN COURSE" onClick={onClickType}>Main Course {selectItem.length > 0 ? selectItem.filter(item => item.mealType === "MAIN COURSE").length : 0}</button>
                                : <button className='category-button' value="MAIN COURSE" onClick={onClickType}>Main Course {selectItem.length > 0 ? selectItem.filter(item => item.mealType === "MAIN COURSE").length : 0}</button>}
                            {mealType === "DESSERT" ? <button className='category-button active' value="DESSERT" onClick={onClickType}>Desert {selectItem.length > 0 ? selectItem.filter(item => item.mealType === "DESSERT").length : 0}</button> :
                                <button className='category-button' value="DESSERT" onClick={onClickType}>Desert {selectItem.length > 0 ? selectItem.filter(item => item.mealType === "DESSERT").length : 0}</button>}
                            {mealType === "SIDES" ? <button className='category-button active' value="SIDES" onClick={onClickType}>Sides {selectItem.length > 0 ? selectItem.filter(item => item.mealType === "SIDES").length : 0}</button> :
                                <button className='category-button' value="SIDES" onClick={onClickType}>Sides {selectItem.length > 0 ? selectItem.filter(item => item.mealType === "SIDES").length : 0}</button>}

                        </div>
                        <div className='selector-container'>
                            <p>{mealType.charAt(0).toUpperCase() + mealType.slice(1).toLowerCase()} Selected  {selectItemCount}</p>
                            <div className='veg-button-container'>
                                <button className='veg-button' onClick={setVegList}><span className="veg-dot"></span></button>
                                <button className='non-veg-button' onClick={setNonVegList}><span className="non-veg-dot"></span></button>
                            </div>
                        </div>
                    </div>
                    <div className='content-container'>
                        {
                            filterList.length > 0
                                ? filterList.map(item => (
                                    <DishCard
                                        text={item}
                                        key={item.id}
                                        onAddItem={onAddItem}
                                        onRemoveItem={onRemoveItem}
                                        isAdded={selectItem}
                                        onClickIngredient={onClickIngredient}
                                    />
                                ))
                                : <h1> No Dish found</h1>
                        }
                    </div>
                </div>
            </div>
            <div>
                {showIngredient ? <IngredientCard text={ingredientItem} isAdded={selectItem} onAddItem={onAddItem}
                    onRemoveItem={onRemoveItem} /> : null}
            </div>
        </div>
    )
}