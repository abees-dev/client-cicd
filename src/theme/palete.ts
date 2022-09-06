import { alpha, PaletteOptions } from '@mui/material';

const primary = {
  lighter: '#EBD6FD',
  light: '#B985F4',
  main: '#7635dC',
  dark: '#431A9E',
  darker: '#200A69',
};

const secondary = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
};
const info = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
};
const success = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
};
const warning = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
};
const error = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
};

interface IPallette {
  light: Partial<PaletteOptions>;
  dark: Partial<PaletteOptions>;
}

const grey = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

const palette: Partial<PaletteOptions> = {
  common: {
    black: '#000',
    white: '#FFF',
  },
  primary: {
    ...primary,
    contrastText: '#FFF',
  },
  secondary: {
    ...secondary,
    contrastText: '#FFF',
  },
  success: {
    ...success,
    contrastText: grey[800],
  },
  error: {
    ...error,
    contrastText: grey[800],
  },
  info: {
    ...info,
    contrastText: '#FFF',
  },
  grey: grey,
  divider: grey[500_24],
  action: {
    hover: grey[500_8],
    selected: grey[500_16],
    disabled: grey[500_80],
    disabledBackground: grey[500_24],
    focus: grey[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const paletteMode: IPallette = {
  light: {
    ...palette,
    mode: 'light',
    text: { primary: grey[800], secondary: grey[600], disabled: grey[500] },
    background: { paper: '#fff', default: '#fff' },
    action: {
      ...palette.action,
      active: grey[600],
    },
  },
  dark: {
    ...palette,
    mode: 'dark',
    text: { primary: '#fff', secondary: grey[500], disabled: grey[600] },
    background: { paper: grey[800], default: grey[900] },
    action: {
      ...palette.action,
      active: grey[500],
    },
  },
};

export default paletteMode;
