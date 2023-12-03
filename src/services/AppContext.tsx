import { Dispatch, createContext } from "react";
import { User } from "../types";

interface ContextData {
  isLoading: boolean,
  setIsLoading: Dispatch<React.SetStateAction<boolean>>,

  session: User | null,
  setSession: Dispatch<React.SetStateAction<User | null>>,

  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>,
}

const AppContext = createContext<ContextData>({} as ContextData);

export default AppContext;