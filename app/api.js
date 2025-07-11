export async function getFoodRecommendations(city) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${city}`
    );
    const data = await response.json();
    return await data;
  } catch (error) {
    console.error("Error fetching food recommendations:", error);
    return { meals: [] };
  }
}
