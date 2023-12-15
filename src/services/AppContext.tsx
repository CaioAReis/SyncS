import { Dispatch, createContext } from "react";

import { AchievementProps, Earnings, User } from "../types";

interface ContextData {
  isLoading: boolean,
  setIsLoading: Dispatch<React.SetStateAction<boolean>>,

  session: User | null,
  setSession: Dispatch<React.SetStateAction<User | null>>,

  achievements: Partial<AchievementProps>[],
  setAchievements: Dispatch<React.SetStateAction<Partial<AchievementProps>[]>>,

  theme: string,
  setTheme: React.Dispatch<React.SetStateAction<string>>,

  setEarnings: Dispatch<React.SetStateAction<Earnings | null>>,

  checkLevel: ({ levelType }: { levelType: number }) => number,
}

const AppContext = createContext<ContextData>({} as ContextData);

export default AppContext;