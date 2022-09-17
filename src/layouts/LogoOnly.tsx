import { Box, styled } from '@mui/material';
import React, { ReactElement } from 'react';
import Logo from '../components/Logo';
import { IPropsTypes } from '../types/props';

const LogoStyled = styled('header')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  width: '100%',
  paddingTop: theme.spacing(6),
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
}));
export default function LogoOnly({ children }: IPropsTypes<ReactElement>) {
  return (
    <Box>
      <LogoStyled>
        <Logo sx={{ width: 32, height: 32 }} link="/" />
      </LogoStyled>
      {children}
    </Box>
  );
}
