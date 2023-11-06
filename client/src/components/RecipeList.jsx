import React, { useState } from "react";
import { Grid } from "@mui/material";
import Recipe from "./Recipe";
import RecipeDetails from "./RecipeDetails"; // Import the RecipeDetails component

const RecipeList = ({ recipes }) => {
  const recipesPerPage = 3;
  const recipesPerRow = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Track the selected recipe

  const indexOfLastRecipe = currentPage * recipesPerPage * recipesPerRow;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage * recipesPerRow;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(
    recipes.length / (recipesPerPage * recipesPerRow)
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Handle the recipe click event and set the selected recipe
  const handleRecipeClick = (recipeId) => {
    setSelectedRecipe(recipeId);
  };

  return (
    <>
      <Grid container spacing={3}>
        {currentRecipes.map((recipe) => (
          <Grid key={recipe?._id} item lg={3} md={4} sm={6} xs={12}>
            <Recipe
              recipe={recipe}
              onClick={() => handleRecipeClick(recipe._id)}
            />{" "}
            {/* Pass recipeId on click */}
          </Grid>
        ))}
      </Grid>
      <div style={{ textAlign: "center" }}>
        {totalPages > 1 && (
          <ul className="pagination">
            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Render RecipeDetails if a recipe is selected */}
      {selectedRecipe && <RecipeDetails recipeId={selectedRecipe} />}
    </>
  );
};

export default RecipeList;
