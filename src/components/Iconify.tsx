import React from 'react';
import { Icon } from '@iconify/react';
import { Box, BoxProps } from '@mui/material';
import { PropsCustoms } from '../types/PropsTypes';

interface IIconify {
  icon: string;
}

export default function Iconify({ icon, sx, ...other }: IIconify & PropsCustoms<BoxProps>) {
  return (
    <Box
      component={Icon}
      icon={icon}
      sx={{
        width: 32,
        height: 32,
        ...sx,
      }}
      {...other}
    />
  );
}
