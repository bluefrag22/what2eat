"use client";
import { useEffect, useState } from "react";
import { getFoodRecommendations } from "./api";

export default function Home() {
  const [foodRecommendations, setFoodRecommendations] = useState([]);
  const [city, setCity] = useState("Canadian"); // Default city
  const [randomMeal, setRandomMeal] = useState(null);

  useEffect(() => {
    async function fetchmeal() {
      const data = await getFoodRecommendations(city);
      console.log("Fetched data:", data);
      if (data && Array.isArray(data.meals)) {
        setFoodRecommendations(data.meals);
      } else {
        setFoodRecommendations([]);
      }
    }

    fetchmeal();
  }, [city]);

  const pickARandomMeal = () => {
    if (foodRecommendations.length === 0) return;

    const randomIndex = Math.floor(Math.random() * foodRecommendations.length);
    const meal = foodRecommendations[randomIndex];
    setRandomMeal(meal); // Save to state to display
  };

  return (
    <div className="bg-white w-full h-screen text-black flex flex-col items-center justify-center">
      <h2>
        {foodRecommendations.length > 0
          ? "Food Recommendations"
          : "No Recommendations Available"}
      </h2>
      <p>{randomMeal ? randomMeal.strMeal : "No Meal Selected"}</p>

      <div className="flex space-x-5">
        <button
        onClick={pickARandomMeal}
        className="bg-blue-400 text-white px-4 py-2 rounded-2xl border-2 border-blue-500 shadow-[0_6px_0_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_rgba(0,0,0,0.2)] active:translate-y-1 transition-all duration-150"
      >
        Pick a Random Meal
      </button>
      <select
        name="city"
        id="city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        <option value="Canadian">Canada</option>
        <option value="American">USA</option>
        <option value="Mexican">Mexico</option>
        <option value="Italian">Italy</option>
        <option value="Chinese">China</option>
        <option value="Japanese">Japan</option>
      </select>

      </div>
      
    </div>
  );
}
