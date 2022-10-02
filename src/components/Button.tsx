import { Button, ButtonProps } from '@mui/material';
import { ReactElement } from 'react';
import { PropsCustoms } from '../types/props';

export default function CustomButton({ children, ...other }: PropsCustoms<ButtonProps>): ReactElement {
  return <Button {...other}>{children}</Button>;
}
