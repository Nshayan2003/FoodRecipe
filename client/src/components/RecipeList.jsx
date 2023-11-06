import React, { useState } from "react";
import { Grid } from "@mui/material";
import Recipe from "./Recipe";

const RecipeList = ({ recipes }) => {
  const recipesPerPage = 3;
  const recipesPerRow = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRecipe = currentPage * recipesPerPage * recipesPerRow;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage * recipesPerRow;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(
    recipes.length / (recipesPerPage * recipesPerRow)
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Grid container spacing={3}>
        {currentRecipes.map((recipe) => (
          <Grid key={recipe?._id} item lg={3} md={4} sm={6} xs={12}>
            <Recipe recipe={recipe} />{" "}
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
    </>
  );
};

export default RecipeList;
