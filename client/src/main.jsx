import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import RecipeContextProvider from "./context/RecipeContext";
import UserContextProvider from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <RecipeContextProvider>
        <App />
      </RecipeContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
