import { DishList } from './components/DishList'
import { IngredientModel } from './components/IngredientModal'
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DishList />} />
        <Route path="/ingredient" element={<IngredientModel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
