import React, { createContext, useState } from 'react'

// Creating context
export const DarkThemeContext = createContext();

const ThemeContext = ({children}) => {

  // Getting system color schema
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // On page load getting color schema from local storage, if not available use system color schema
  const [theme, setTheme] = useState(localStorage.theme === 'dark' ? true : (localStorage.theme === 'light' ? false : systemTheme));

  return (
    <DarkThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </DarkThemeContext.Provider>
  )
};

export default ThemeContext;