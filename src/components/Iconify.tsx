import React from 'react';
import { Icon } from '@iconify/react';
import { Box, BoxProps } from '@mui/material';
import { PropsCustoms } from '../types/props';

interface IIconify {
  icon: string;
}

export default function Iconify({ icon, sx, ...other }: IIconify & PropsCustoms<BoxProps>) {
  return (
    <Box
      component={Icon}
      icon={icon}
      sx={{
        ...sx,
      }}
      {...other}
    />
  );
}
