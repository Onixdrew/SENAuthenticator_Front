import { createContext, useState } from "react";

export const AuthContext2 = createContext();

const AuthContextProvider = ({ children }) => {
  const [user2, setUser2] = useState(null);

  return <AuthContext2.Provider value={{
    setUser2, user2
  }}>{children}</AuthContext2.Provider>;
};

export default AuthContextProvider;
