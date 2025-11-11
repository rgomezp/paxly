import { createContext, useContext, useEffect, useState } from "react";
import { IFlags } from "@/types/IFlags";
import FlagManager from "../managers/FlagManager";
import Log from "../utils/Log";

interface FlagContextProps {
  useFeatureFlags: () => IFlags | Record<string, never>;
}

const FlagContext = createContext<FlagContextProps | undefined>(undefined);

export const FlagProvider = ({ children }: { children: React.ReactNode }) => {
  const [flags, setFlags] = useState<IFlags>();

  useEffect(() => {
    loadFlags().catch((error) => Log.error('FlagProvider: error loading flags:' + error));
  }, []);

  const loadFlags = async () => {
    const flags = await FlagManager.getFeatureFlags();

    if (flags) {
      setFlags(flags);
    }
  };

  const useFeatureFlags = () => {
    if (!flags) {
      return {};
    }

    return flags;
  };

  return (
    <FlagContext.Provider value={{ useFeatureFlags }}>
      {children}
    </FlagContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FlagContext);

  if (!context) {
    throw new Error('useFeatureFlags must be used within a FlagProvider');
  }

  return context.useFeatureFlags();
}
