import { alpha, GlobalStyles, useTheme } from '@mui/material';

export const OverrideScroll = () => {
  const theme = useTheme();
  return (
    <GlobalStyles
      styles={{
        '::-webkit-scrollbar': {
          borderRadius: theme.shape.borderRadius,
          width: 6,
        },
        '::-webkit-scrollbar:hover': {
          backgroundColor: alpha(theme.palette.grey[theme.palette.mode === 'light' ? 300 : 700], 0.5),
          width: 10,
        },

        '::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.divider,
          borderRadius: theme.shape.borderRadius,
          width: 10,
        },
      }}
    />
  );
};
