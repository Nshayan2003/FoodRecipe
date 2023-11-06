import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, SignUp } from "./pages";
import { Navbar } from "./components";
import { Container, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Container disableGutters maxWidth="xl">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
