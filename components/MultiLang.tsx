import React, { useContext } from 'react'
import { RtlProvider } from "../components/rtl-provider"
import { LangContext } from "../context/language"
import { Languages } from "../bussiness/language"

const MultiLang = ({ children }: { children: React.ReactNode }) => {
    const { language } = useContext(LangContext);
    return <RtlProvider dir={language == Languages.fa ? "rtl" : "ltr"}>
        {children}
    </RtlProvider>
}

export default MultiLang