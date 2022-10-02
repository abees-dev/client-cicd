import { Components, Theme } from '@mui/material';

export default function Tooltip(theme: Theme): Components {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltipPlacementTop: {},
        tooltipPlacementBottom: {},
        tooltipPlacementLeft: {},
        tooltipPlacementRight: {},
      },
    },
  };
}
