import { createContext } from "react";

const userContext = createContext();

export const userProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
};
