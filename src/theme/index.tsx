import { createTheme, CssBaseline, ThemeOptions, ThemeProvider as MUIThemeProvider } from '@mui/material';
import React, { ReactElement, ReactNode, useMemo } from 'react';
import useSetting from '../hooks/useSetting';
import { IPropsTypes } from '../types/props';
import breakpoints from './breakpoint';
import overridesComponents from './overrides';
import paletteMode from './pallette';
import shadows, { customShadows } from './shadow';
import typography from './typography';

export default function ThemeProvider({ children }: IPropsTypes<ReactNode>): ReactElement {
  const { themeMode } = useSetting();
  const isLight: boolean = themeMode === 'light';

  const themeOption: ThemeOptions = useMemo(
    () => ({
      palette: isLight ? paletteMode.light : paletteMode.dark,
      breakpoints: breakpoints,
      typography: typography,
      shape: {
        borderRadius: 8,
      },
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight]
  );

  const theme = createTheme(themeOption);
  theme.components = overridesComponents(theme);
  return (
    <>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </>
  );
}
