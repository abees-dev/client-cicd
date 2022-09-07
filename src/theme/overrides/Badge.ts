import { Components, Theme } from '@mui/material';

export default function Badge(theme: Theme): Components {
  return {
    MuiBadge: {
      styleOverrides: {
        colorError: {
          color: theme.palette.common.white,
        },
      },
    },
  };
}
