import { createContext, useState } from "react";

import Cookies from "js-cookie";

import { TOKEN, USER } from "../constants";
import Children from "../types/children";
import User from "../types/user";

interface AuthContextTypes {
  isAuthenticated: boolean;
  user: User | null;
  setIsAuthenticated: (bool: boolean) => void;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext({} as AuthContextTypes);

const AuthContextProvider = ({ children }: Children) => {
  const userJson = localStorage.getItem(USER);
  const userStorage = userJson ? JSON.parse(userJson) : null;

  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(Cookies.get(TOKEN))
  );
  const [user, setUser] = useState<User | null>(userStorage);

  const store = { isAuthenticated, user, setUser, setIsAuthenticated };
  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
