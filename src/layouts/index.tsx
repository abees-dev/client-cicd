import { styled } from '@mui/material';
import { ReactElement } from 'react';
import { IPropsTypes } from '../types/PropsTypes';
import DashboardLayout from './dashboard';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
}));

const MainStyle = styled('main')(() => ({
  flex: 1,
}));

export default function Layout({ children }: IPropsTypes<ReactElement>) {
  return (
    <RootStyle>
      <DashboardLayout />
      <MainStyle>{children}</MainStyle>
    </RootStyle>
  );
}
