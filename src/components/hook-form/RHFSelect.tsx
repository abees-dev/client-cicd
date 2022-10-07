import PropTypes from 'prop-types';
import { useFormContext, Controller } from 'react-hook-form';
import { TextField, TextFieldProps } from '@mui/material';
import { ReactElement, ReactNode } from 'react';

interface RHFSelectProp {
  name: string;
  children: ReactNode;
}

type RHFSelectType = RHFSelectProp & TextFieldProps;

export default function RHFSelect({ name, children, ...other }: RHFSelectType) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField {...field} select fullWidth error={!!error} helperText={error?.message} {...other}>
          {children}
        </TextField>
      )}
    />
  );
}
