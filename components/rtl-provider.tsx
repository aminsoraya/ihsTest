import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtl from "stylis-plugin-rtl";

// NB: A unique `key` is important for it to work!
const options = {
  rtl: { key: "css-ar", stylisPlugins: [rtl] },
  ltr: { key: "css-en" },
};

interface IProps {
  children: React.ReactNode,
  dir: "rtl" | "ltr"
}
export function RtlProvider({ children, dir }: IProps) {
  const cache = createCache(dir === "rtl" ? options.rtl : options.ltr);
  return <CacheProvider value={cache}  >
    {children}
  </CacheProvider>
}
