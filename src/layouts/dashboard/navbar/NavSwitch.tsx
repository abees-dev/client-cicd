import { Button, styled } from '@mui/material';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import Iconify from '../../../components/Iconify';
import useCookiesTheme from '../../../hooks/useCookies';
import useSetting from '../../../hooks/useSetting';

type ButtonAnimateProps = {
  isLight: boolean;
};

const RootStyled = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.action.focus,
  height: 48,
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  borderRadius: theme.spacing(20),
  padding: theme.spacing(0.5),
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'space-between',
  gap: 4,
  position: 'relative',
}));
const ButtonStyled = styled(Button)(({ theme }) => ({
  borderRadius: 100,
  minWidth: 115,
  color: theme.palette.text.secondary,
  '&:hover': {
    backgroundColor: 'transparent',
  },
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

const ButtonAnimateStyled = styled(Button, {
  shouldForwardProp: (props) => props !== 'isLight',
})<ButtonAnimateProps>(({ theme, isLight }) => {
  const transformX = isLight ? '3px' : 'calc(100% + 3px)';
  return {
    backgroundColor: '#FFF',
    borderRadius: 100,
    minWidth: 115,
    position: 'absolute',
    top: '50%',
    color: theme.palette.text.secondary,
    transform: `translate(${transformX},-50%)`,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.complex,
    }),
  };
});

const NavSwitch = () => {
  const { onChange, themeMode } = useSetting();

  const isLight = themeMode === 'light';
  const handleClick = (method: string) => {
    onChange(method);
  };
  return (
    <RootStyled>
      <ButtonStyled
        size="medium"
        color="inherit"
        startIcon={<Iconify icon="heroicons:sun-solid" sx={{ width: 24, height: 24 }} />}
        sx={{
          ...(isLight && {
            opacity: 0,
          }),
        }}
        onClick={() => handleClick('light')}
      >
        light
      </ButtonStyled>

      <ButtonStyled
        size="medium"
        color="inherit"
        startIcon={<Iconify icon="heroicons:moon-solid" sx={{ width: 24, height: 24 }} />}
        sx={{
          ...(!isLight && {
            opacity: 0,
          }),
        }}
        onClick={() => handleClick('dark')}
      >
        dark
      </ButtonStyled>

      <ButtonAnimateStyled
        variant="contained"
        size="medium"
        color="inherit"
        isLight={isLight}
        startIcon={
          <Iconify icon={isLight ? 'heroicons:sun-solid' : 'heroicons:moon-solid'} sx={{ width: 24, height: 24 }} />
        }
      >
        {isLight ? 'light' : 'dark'}
      </ButtonAnimateStyled>
    </RootStyled>
  );
};

export default NavSwitch;
