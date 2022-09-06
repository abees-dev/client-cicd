import React, { createContext, ReactElement, useState } from 'react';
import useCookiesTheme from '../hooks/useCookies';
import { IPropsTypes } from '../types/PropsTypes';

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
  const handleChangeTheme = (mode: string) => {
    console.log('first');
    setThemeMode(mode);
  };

  return (
    <SettingContext.Provider value={{ themeMode, onChange: handleChangeTheme }}>{children}</SettingContext.Provider>
  );
}

export { SettingContext };
