import { Box, Stack, styled } from "@mui/material";
import { RecipeList } from "../components";
import { useCallback, useEffect, useState } from "react";
import { RecipeState } from "../context/RecipeContext";
import { UserState } from "../context/UserContext";
import { AxiosPrivate } from "../http";

const Home = () => {
  const [tab, setTab] = useState(1);
  const { recipes } = RecipeState();
  const { user, setUser } = UserState();

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const { data } = await AxiosPrivate.get(`/user/${user._id}`);
        setUser(data)
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetail()
  }, [user?._id, setUser]);

  const handleTab = useCallback((value) => setTab(value), []);

  return (
    <Box padding="20px">
      <Stack direction="row" alignItems="center" gap="20px" marginBottom={4}>
        <TabContainer myTab={tab === 1} onClick={() => handleTab(1)}>
          My Recipes
        </TabContainer>
        <TabContainer myTab={tab === 2} onClick={() => handleTab(2)}>
          Saved Recipes
        </TabContainer>
      </Stack>

      {tab === 1 && <RecipeList recipes={recipes} />}

      {tab === 2 && <RecipeList recipes={user?.likes} />}
    </Box>
  );
};

export default Home;

const TabContainer = styled(Box)(({ myTab }) => ({
  color: myTab && "#008000",
  cursor: "pointer",
  fontWeight: myTab ? 700 : 600,
  position: "relative",
  borderBottom: myTab && "3px solid #008000",
}));
