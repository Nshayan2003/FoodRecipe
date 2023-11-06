import { LocalDining } from "@mui/icons-material";
import { Box, IconButton, Stack } from "@mui/material";
import Search from "./Search";
import MyButton from "./Button";
import { useNavigate } from "react-router-dom";
import { UserState } from "../context/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser, setToken } = UserState();

  const handleLogout = () => {
    localStorage.removeItem("recipeToken");
    localStorage.removeItem("recipeUser");
    navigate("/login");
    setUser(null);
    setToken(null);
  };

  return (
    <Stack
      direction="row"
      padding="16px 20px"
      alignItems="center"
      justifyContent="space-between"
      gap="20px"
      position="sticky"
      top="0"
      backgroundColor="white"
      zIndex={1000}
    >
      <IconButton onClick={() => navigate("/")}>
        <LocalDining
          sx={{ color: "#008000", fontSize: 32, cursor: "pointer" }}
        />
      </IconButton>

      <Box width="50%" sx={{ display: { sm: "block", xs: "none" } }}>
        <Search />
      </Box>

      {!user ? (
        <Stack direction="row" alignItems="center" gap="20px">
          <MyButton
            label="Login"
            variant="outlined"
            onClick={() => navigate("/login")}
          />
          <MyButton
            label="Sign Up"
            sx={{ color: "white" }}
            onClick={() => navigate("/sign-up")}
          />
        </Stack>
      ) : (
        <Stack direction="row" alignItems="center" gap="20px">
          <MyButton
            label="Log out"
            sx={{ color: "white" }}
            onClick={handleLogout}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default Navbar;
