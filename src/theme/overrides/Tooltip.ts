import { Components } from '@mui/material';

export default function Tooltip(): Components {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          maxWidth: 480,
        },
        tooltipPlacementTop: {},
        tooltipPlacementBottom: {},
        tooltipPlacementLeft: {},
        tooltipPlacementRight: {},
      },
    },
  };
}
