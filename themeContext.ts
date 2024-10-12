import React from 'react';

export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
    noteBackground: '#ffffff',
    buttonBackground: '#4CAF50',
    buttonColor: '#ffffff'
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
    noteBackground: '#333333',
    buttonBackground: '#1a8870',
    buttonColor: '#ffffff'
  },
};

export const ThemeContext = React.createContext(themes.light);
