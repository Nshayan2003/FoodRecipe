import { Box, InputBase, styled } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "../utils/debounce";
import { RecipeState } from "../context/RecipeContext";

const Search = ({ value, onChange }) => {
  const { searchQuery, setSearchQuery } = RecipeState();

  // Create a debounced function for setting the search query
  const debouncedSetSearchQuery = debounce((newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  });

  const handleSearchChange = (event) => {
    const newSearchQuery = event.target.value;
    debouncedSetSearchQuery(newSearchQuery);
  };
  return (
    <Box width="100%" position="relative">
      <SerachBox />
      <Input
        type="search"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search your recipe..."
      />
    </Box>
  );
};

export default Search;

const Input = styled(InputBase)(() => ({
  width: "100%",
  border: "1px solid #00800070",
  height: "100%",
  borderRadius: 2,
  paddingLeft: 34,
}));

const SerachBox = styled(SearchIcon)(() => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: 8,
}));
