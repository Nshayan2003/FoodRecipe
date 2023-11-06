import React, { useEffect, useState } from "react";
import { RecipeState } from "../context/RecipeContext";
import http from "../http";

const RecipeDetails = ({ recipeId }) => {
  const { loading, error } = RecipeState();
  const [summary, setSummary] = useState("");
  const [nutrition, setNutrition] = useState({});
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        // Fetch recipe summary
        const { data: summaryData } = await http.get(
          `/recipe/${recipeId}/summary`
        );
        setSummary(summaryData.summary);

        // Fetch recipe nutrition
        const { data: nutritionData } = await http.get(
          `/recipe/${recipeId}/nutrition`
        );
        setNutrition(nutritionData);

        // Fetch recipe ingredients
        const { data: ingredientsData } = await http.get(
          `/recipe/${recipeId}/ingredients`
        );
        setIngredients(ingredientsData.ingredients);
      } catch (error) {
        console.log(error);
        // You can set an error state here if needed
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  return (
    <div>
      {/* Check if loading */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Recipe Summary</h2>
          <p>{summary}</p>

          <h2>Nutritional Information</h2>
          <pre>{JSON.stringify(nutrition, null, 2)}</pre>

          <h2>Ingredients</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name}</li>
            ))}
          </ul>
        </>
      )}
      {/* Check for errors */}
      {error && <p>Error fetching recipe details</p>}
    </div>
  );
};

export default RecipeDetails;
