import { createContext, useEffect, useState } from "react";

export const theme = {
  light: "light",
  dark: "dark",
};

export const ThemeContext = createContext({
  theme: "light",
});

export const ThemeContextProvider = ({ children }) => {
  const defaultTheme =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || defaultTheme
  );

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
