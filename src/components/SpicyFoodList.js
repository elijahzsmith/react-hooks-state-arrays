import React, { useState } from "react";
import { spicyFoods, getNewSpicyFood } from "../data";

function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [filterBy, setFilter] = useState("All");

  function handleAddFood() {
    const newFood = getNewSpicyFood();
    setFoods([...foods, newFood]);
  }

  function handleSpice(id) {
    const newHeatLevel = foods.map((food) => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1,
        }; // each foods props are spread THEN we update heatLevel with (++)
      } else {
        return food;
      }
    });
    setFoods(newHeatLevel);
  }

  function handleFilter(e) {
    setFilter(e.target.value)
  }
  const foodsToDisplay = foods.filter((food) => {
    if (filterBy === "All") {
      return true;
    } else {
      return food.cuisine === filterBy;
    }
  });


const foodList = foodsToDisplay.map((food) => (
  <li key={food.id} onClick={() => handleSpice(food.id)}>
    {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
  </li>
));

return (
  <div>
    <button onClick={(e) => handleFilter(e)}>Add New Food</button>
    <ul>{foodList}</ul>
    <select name="filter" onChange={handleFilter}>
      <option value="All">All</option>
      <option value="American">American</option>
      <option value="Sichuan">Sichuan</option>
      <option value="Thai">Thai</option>
      <option value="Mexican">Mexican</option>
    </select>
  </div>
);
}
export default SpicyFoodList;

// function handleRemove(id) {
//   setFoods(foods.filter((food) => food.id !== id))
// }

// <li key={food.id} onClick={() => handleRemove(food.id)}>
//   {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
// </li>
