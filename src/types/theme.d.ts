import { Theme, Palette } from '@mui/material';
import { ICustomShadows } from '../theme/shadow';
declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
  }

  interface Theme {
    customShadows: ICustomShadows;
  }

  interface ThemeOptions {
    customShadows?: ICustomShadows;
  }
}
