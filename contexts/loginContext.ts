import React from "react";
import { UserRole } from "@/app/types";

export type LoginContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  userRole: UserRole | null;
  setUserRole: (role: UserRole | null) => void;
};

export const LoginContext = React.createContext<LoginContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userRole: null,
  setUserRole: () => {},
});

export const useLoginContext = () => {
  const context = React.useContext(LoginContext);
  if (!context) {
    throw new Error("useLoginContext ka systummm");
  }
  return context;
};
