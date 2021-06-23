import { createContext, useState } from "react";
import localStorageService from "../services/localStorageService";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const payload = localStorageService.getToken()
    ? jwtDecode(localStorageService.getToken())
    : false;
  const [user, setUser] = useState(payload);
  const [ balance, setBalance] = useState(0);
  const [trigger, setTrigger] = useState(false);
  return (
    <AuthContext.Provider value={{ user, setUser, balance, setBalance, trigger, setTrigger }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
