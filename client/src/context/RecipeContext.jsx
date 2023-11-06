import { createContext, useContext, useEffect, useState } from "react";
import http from "../http";

export const RecipeContext = createContext();

const RecipeContextProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data } = await http.get(
          `/recipe?search=${searchQuery}&page=${page}&perPage=${perPage}`
        );

        setRecipes(data?.recipes);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipes();
  }, [page, perPage, searchQuery]);

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        loading,
        setLoading,
        error,
        setError,
        page,
        setPage,
        perPage,
        setPerPage,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const RecipeState = () => useContext(RecipeContext);

export default RecipeContextProvider;
