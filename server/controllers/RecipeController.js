import Recipe from "../models/Recipe.js";
import axios from "axios";
import User from "../models/User.js";

export const addRecipeData = async () => {
  try {
    await Recipe.deleteMany({});

    await Recipe.deleteMany({});

    const totalResults = 5220; // Total number of results

    // Set the number of results you want to fetch in each page
    const resultsPerPage = 10;

    // Calculate the number of pages needed to retrieve all data
    const totalPages = Math.ceil(totalResults / resultsPerPage);

    for (let page = 1; page <= totalPages; page++) {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API}&page=${page}&number=${resultsPerPage}`
      );

      // Check if the response contains the "results" array
      if (response.data.results && Array.isArray(response.data.results)) {
        // Iterate through the results and save them to MongoDB
        for (const recipeData of response.data.results) {
          const recipe = new Recipe({
            id: recipeData.id,
            title: recipeData.title,
            image: recipeData.image,
            imageType: recipeData.imageType,
            isLike: false, // You can set the default value here
          });

          await recipe.save(); // Save the recipe to MongoDB
        }
      }
    }

    console.log("Recipes imported successfully");
  } catch (error) {
    console.log(`Invalid API response: ${error.message}`);
  }
};

// https://api.spoonacular.com/recipes/complexSearch?apiKey=6c6ead6cfef54b19a215fe8203992738
// Get All recipes
export const getRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const searchQuery = req.query.search || "";

    const query = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: `.*${searchQuery}.*`, $options: "i" } }, // Case-insensitive global search for Name
      ];
    }

    const totalRecipes = Recipe.countDocuments(query);
    const allRecipes = Recipe.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);

    const [totalResults, recipes] = await Promise.all([
      totalRecipes,
      allRecipes,
    ]);

    const totalPages = Math.ceil(totalResults / perPage);
    res.status(200).json({
      totalResults,
      totalPages,
      page,
      recipes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Single Recipe
export const getRecipeById = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save / Like the recipe
export const saveRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const isLike = req.body.isLike;
    const userId = req.user._id;

    const user = await User.findById(userId);

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const userLikes = user.likes || [];
    const recipeIndex = userLikes.indexOf(recipeId);

    recipe.isLike = isLike;
    recipe.userId = userId;

    await recipe.save();

    if (isLike) {
      // If the user is liking the recipe, add the recipe's ID to the likes array
      if (recipeIndex === -1) {
        user.likes.push(recipeId);
        await user.save();
      }
    } else {
      // If the user is unliking the recipe, remove the recipe's ID from the likes array
      if (recipeIndex !== -1) {
        user.likes.splice(recipeIndex, 1);
        await user.save();
      }
    }

    const likedRecipes = await Recipe.find({ _id: { $in: user.likes } });
    res.status(200).json(likedRecipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
