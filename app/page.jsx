"use client";
import { useEffect, useState } from "react";
import { getFoodRecommendations } from "./api";
import nigerianFoods from "./nigeriafooddb";

export default function Home() {
  const [foodRecommendations, setFoodRecommendations] = useState([]);
  const [suggestedmeal, setSuggestedMeal] = useState([]);
  const [budgets, setBudgets] = useState("");
  const [Category, setCategory] = useState("");


  const Getsuggestions = () => {
    const numberBudgets = Number(budgets);
    const filter = nigerianFoods.filter(
      (nigerianFoods) => nigerianFoods.minCostNGN <= numberBudgets
    ).filter(
      (nigerianFoods) => nigerianFoods.category === Category
    );
    setSuggestedMeal(filter);

  };

  // const pickARandomMeal = () => {
  //   if (foodRecommendations.length === 0) return;

  //   const randomIndex = Math.floor(Math.random() * foodRecommendations.length);
  //   const meal = foodRecommendations[randomIndex];
  //   setRandomMeal(meal); // Save to state to display
  // };

  return (
    <div className="bg-white w-full h-screen text-black flex flex-col items-center justify-center">
      <h2>waytin we go eat?</h2>
      <ul>
        {budgets ? (
          suggestedmeal.length > 0 ? (
            suggestedmeal.map((food, index) => (
              <li key={index} className="text-center">
                {food.name} - {food.minCostNGN} NGN
              </li>
            ))
          ) : (
            <li className="text-center text-red-500">
              Omo sapa dey town ooooh! 😓
            </li>
          )
        ) : null}
      </ul>

      <div className="flex flex-col justify-center items-center space-y-4 w-full   ">
        <input
          value={budgets}
          onChange={(e) => setBudgets(Number(e.target.value))}

          type="number"
          className="border-2 border-blue-500 rounded-2xl w-40 p-2 text-sm shadow-[0_6px_0_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_rgba(0,0,0,0.2)] active:translate-y-1 transition-all duration-150"
          placeholder="enter budget"
        />
        <select name="" id="" value={Category} onChange={(e) => setCategory(e.target.value)} className="border-2 border-blue-500 rounded-2xl w-40 p-2 text-sm shadow-[0_6px_0_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_rgba(0,0,0,0.2)] active:translate-y-1 transition-all duration-150">
          <option value="">Select Category</option>
          <option value="Swallow & Soup">Swallow & Soup</option>
          <option value="Staples & Solids">Staples & Solids</option>
          <option value="Snacks & Street Food">Snacks & Street Food</option>
          <option value="Junk & Oily">Junk & Oily</option>
          <option value="Cultural & Local Dishes">Cultural & Local Dishes</option>
          <option value="Balanced Traditional Meal">Balanced Traditional Meal</option>
          <option value="Vegetables & Light Meals">Vegetables & Light Meals</option>

        </select>
        <button
          onClick={Getsuggestions}
          className="bg-blue-400 text-white px-4 py-2 rounded-2xl border-2 border-blue-500 shadow-[0_6px_0_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_rgba(0,0,0,0.2)] active:translate-y-1 transition-all duration-150"
        >
          Get Food Suggestions
        </button>
      </div>
    </div>
  );
}
