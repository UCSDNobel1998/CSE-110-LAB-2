import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext, themes } from "./themeContext";



// Wrapper component to provide context
export function ToggleTheme() {
 const [currentTheme, setCurrentTheme] = useState(themes.light);

 const toggleTheme = () => {
   setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
 };

 return (
   <ThemeContext.Provider value={currentTheme}>
     <button onClick={toggleTheme}> Toggle Theme </button>
   </ThemeContext.Provider>
 );
}

export default ToggleTheme;

