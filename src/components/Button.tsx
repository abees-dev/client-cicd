import { Button, ButtonProps, styled } from '@mui/material';
import { ReactElement } from 'react';
import { PropsCustoms } from '../types/PropsTypes';

const CustomButtonStyle = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.dark,
}));

export default function CustomButton({ children, ...other }: PropsCustoms<ButtonProps>): ReactElement {
  return <Button {...other}>{children}</Button>;
}
