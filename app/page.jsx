"use client";
import { useEffect, useState } from "react";
import { getFoodRecommendations } from "./api";
import nigerianFoods from "./nigeriafooddb";
import { Listbox } from "@headlessui/react";

export default function Home() {
  const [foodRecommendations, setFoodRecommendations] = useState([]);
  const [suggestedmeal, setSuggestedMeal] = useState([]);
  const [budgets, setBudgets] = useState("");
  const [Category, setCategory] = useState("");

  const catigories = [
    {
      label: "Swallow & Soup",
      value: "Swallow & Soup",
      description: "Eba, Fufu, etc.",
    },
    {
      label: "Staples & Solids",
      value: "Staples & Solids",
      description: "Rice, Yam, etc.",
    },
    {
      label: "Snacks & Street Food",
      value: "Snacks & Street Food",
      description: "Suya, Puff Puff",
    },
    {
      label: "Junk & Oily",
      value: "Junk & Oily",
      description: "Chinchin, Meat Pie",
    },
    {
      label: "Cultural & Local Dishes",
      value: "Cultural & Local Dishes",
      description: "Jollof Rice, Pounded Yam",
    },
    {
      label: "Balanced Traditional Meal",
      value: "Balanced Traditional Meal",
      description: "Beans, Plantain, Egg",
    },
    {
      label: "Vegetables & Light Meals",
      value: "Vegetables & Light Meals",
      description: "Salad, Steamed Vegetables",
    },
  ];

  const Getsuggestions = () => {
    const numberBudgets = Number(budgets);

    const filter = nigerianFoods.filter((food) => {
      const withinBudget = food.minCostNGN <= numberBudgets;
      const matchCategory = Category ? food.category === Category : true;
      return withinBudget && matchCategory;
    });

    setSuggestedMeal(filter);
  };



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
        <Listbox value={Category} onChange={setCategory}>
          <Listbox.Button className="border-2 border-blue-500 rounded-2xl w-40 p-2 text-sm shadow-[0_6px_0_rgba(0,0,0,0.2)] active:shadow-[0_2px_0_rgba(0,0,0,0.2)] active:translate-y-1 transition-all duration-150">
            {Category || "All Category"}
          </Listbox.Button>

          <Listbox.Options className="bg-white shadow-lg rounded-xl p-2 mt-1 border-2 border-blue-500">
            {catigories.map((cat) => (
              <Listbox.Option
                key={cat.value}
                value={cat.value}
                className="p-2 cursor-pointer hover:bg-blue-100 rounded-md"
              >
                <div>
                  <div className="font-semibold">{cat.label}</div>
                  <div className="text-xs text-gray-500">{cat.description}</div>
                </div>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Listbox>
       
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
