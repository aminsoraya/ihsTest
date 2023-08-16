import React, { useContext } from "react";
import { LangContext } from "../context/language";
import { Languages, en_Pages, fa_Pages } from "../bussiness/language";

function LanguageAlias() {
  const { language } = useContext(LangContext);
  return language == Languages.fa ? fa_Pages : en_Pages;
}

export default LanguageAlias;

export function Language() {
  const { language } = useContext(LangContext);
  return language;
}
