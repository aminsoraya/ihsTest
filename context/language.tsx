import React, { createContext, useState } from "react";
import { Languages } from "../bussiness/language";

interface IContext {
  language: Languages;
  setLanguage: React.Dispatch<React.SetStateAction<Languages>>;
}

export const LangContext = createContext<IContext>({} as IContext);

export const LangContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState(Languages.fa);

  return (
    <LangContext.Provider value={{ language, setLanguage }}>
      {children}
    </LangContext.Provider>
  );
};
