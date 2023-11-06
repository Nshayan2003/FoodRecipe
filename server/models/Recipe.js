import mongoose from "mongoose";

const recipeSchema = mongoose.Schema(
  {
    id: Number,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    imageType: {
      type: String,
      required: true,
      trim: true,
    },

    isLike: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
