import { SxProps } from '@mui/material';

export type PropsCustoms<Type> = {
  [Property in keyof Type]?: Type[Property];
};

export interface IPropsTypes<Type> {
  children: Type;
  sx?: SxProps;
}
