"use client";
import { useEffect, useState } from "react";
import { getFoodRecommendations } from "./api";
import nigerianFoods from "./nigeriafooddb";

export default function Home() {
  const [foodRecommendations, setFoodRecommendations] = useState([]);
  const [city, setCity] = useState("Canadian"); // Default city
  const [suggestedmeal, setSuggestedMeal] = useState([]);
  const [budgets, setBudgets] = useState("");


  const Getsuggestions = () => {
    const numberBudgets = Number(budgets);
    const filter = nigerianFoods.filter(
      (nigerianFoods) => nigerianFoods.minCostNGN <= numberBudgets
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

      <div className="flex justify-center items-center space-x-2 w-full   ">
        <input
          value={budgets}
          onChange={(e) => setBudgets(Number(e.target.value))}

          type="number"
          className="border-2 border-blue-500 rounded-2xl w-20 p-2 text-sm"
          placeholder="enter budget"
        />
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
