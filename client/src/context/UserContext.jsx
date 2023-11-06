import { createContext, useContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("recipeToken"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("recipeUser"))
  );

  return (
    <UserContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => useContext(UserContext);

export default UserContextProvider;
