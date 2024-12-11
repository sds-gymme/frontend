import { createContext } from "react";

export const LoginContext = createContext({
  isLoggedIn: null,
  setIsLoggedIn: (value: boolean) => {},
});
