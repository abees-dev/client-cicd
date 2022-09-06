import { createTheme, CssBaseline, ThemeOptions, ThemeProvider as MUIThemeProvider } from '@mui/material';
import React, { ReactElement, useMemo } from 'react';
import breakpoints from './breakpoint';
import paletteMode from './palete';
import typography from './typography';

interface IThemeProvider {
  children: ReactElement;
}

export default function ThemeProvider({ children }: IThemeProvider): ReactElement {
  const isLight: boolean = true;

  const themeOption: ThemeOptions = useMemo(
    () => ({
      palette: isLight ? paletteMode.light : paletteMode.dark,
      breakpoints: breakpoints,
      typography: typography,
      shape: {
        borderRadius: 4,
      },
    }),
    [isLight]
  );

  const theme = createTheme(themeOption);
  return (
    <>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </>
  );
}
