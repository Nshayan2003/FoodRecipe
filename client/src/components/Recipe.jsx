import { Box, IconButton, styled } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { AxiosPrivate } from "../http";
const Recipe = ({ recipe }) => {
  const [isLike, setIsLike] = useState(recipe?.isLike);

  const handleLike = async (id) => {
    try {
      // Send the opposite value of the current isLike state to the server
      const response = await AxiosPrivate.patch(`/recipe/${id}/like`, {
        isLike: !isLike,
      });

      // Update the isLike state based on the response from the server
      if (response.data.success) {
        setIsLike(!isLike);
      }

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box height="200px" width="100%" position="relative">
      <RecipeImage src={recipe?.image} alt={recipe?.title} />

      <Favorite>
        {isLike === true ? (
          <IconButton onClick={() => handleLike(recipe._id)}>
            <FavoriteIcon sx={{ color: "#008000", fontSize: 28 }} />
          </IconButton>
        ) : (
          <IconButton onClick={() => handleLike(recipe._id)}>
            <FavoriteBorderIcon sx={{ color: "#008000", fontSize: 28 }} />
          </IconButton>
        )}
      </Favorite>

      <BlurContainer>
        <RecipeTitle>{recipe?.title}</RecipeTitle>
      </BlurContainer>
    </Box>
  );
};

export default Recipe;

const RecipeImage = styled("img")(() => ({
  objectFit: "cover",
  width: "100%",
  height: "100%",
  borderRadius: 20,
}));

const Favorite = styled(Box)(() => ({
  position: "absolute",
  top: 4,
  right: 4,
  color: "white",
}));

const BlurContainer = styled(Box)(() => ({
  cursor: "pointer",
  position: "absolute",
  width: "100%",
  background: "rgba(0, 0, 0, 0.3)",
  height: "50px",
  bottom: 0,
  left: 0,
  right: 0,
  padding: "4px 12px",
  display: "flex",
  alignItems: "center",
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
}));

const RecipeTitle = styled(Box)(() => ({
  color: "white",
  fontWeight: 600,
}));
