import { createContext } from "react";

interface LoginContextInterface {
  isLoggedIn: boolean | null;
  setIsLoggedIn: (value: boolean) => void;
}

export const LoginContext = createContext<LoginContextInterface>({
  isLoggedIn: null,
  setIsLoggedIn: (value: boolean) => {},
});
