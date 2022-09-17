import React, { createContext, ReactElement, useEffect, useState } from 'react';
import useCookiesTheme from '../hooks/useCookies';
import { IPropsTypes } from '../types/props';

interface IInitialState {
  themeMode: string;
  onChange: (mode: string) => void;
}

const initialState: IInitialState = {
  themeMode: 'light',
  onChange: () => {},
};

const SettingContext = createContext(initialState);

export default function SettingContextProvider({ children }: IPropsTypes<ReactElement>): ReactElement {
  const { themeMode, setThemeMode } = useCookiesTheme();

  const [theme, setTheme] = useState('');

  const handleChangeTheme = (mode: string) => {
    setThemeMode(mode);
  };

  useEffect(() => setTheme(themeMode), [themeMode]);

  return (
    <SettingContext.Provider value={{ themeMode: theme, onChange: handleChangeTheme }}>
      {children}
    </SettingContext.Provider>
  );
}

export { SettingContext };
