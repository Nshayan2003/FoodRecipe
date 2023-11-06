import express from "express";
import { getRecipes, saveRecipe } from "../controllers/RecipeController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getRecipes);

router.get("/:id");

router.patch("/:id/like", auth, saveRecipe);

export default router;
